<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

class BookingsAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $action = $_GET['action'] ?? '';

        switch ($action) {
            case 'create':
                $this->createBooking();
                break;
            case 'get-user-bookings':
                $this->getUserBookings();
                break;
            case 'get-all-bookings':
                $this->getAllBookings();
                break;
            case 'get-booking':
                $this->getBooking();
                break;
            case 'update-status':
                $this->updateBookingStatus();
                break;
            case 'cancel':
                $this->cancelBooking();
                break;
            default:
                $this->sendResponse(400, ['error' => 'Invalid action']);
        }
    }

    private function createBooking() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $required = ['userId', 'serviceId', 'checkIn', 'checkOut', 'guests', 'contactName', 'contactPhone', 'paymentMethod', 'totalPrice'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                $this->sendResponse(400, ['error' => "Field $field is required"]);
                return;
            }
        }
        
        try {
            $this->conn->beginTransaction();
            
            $bookingId = 'BK' . time();
            
            // Get service details
            $serviceQuery = "SELECT * FROM services WHERE id = :service_id";
            $serviceStmt = $this->conn->prepare($serviceQuery);
            $serviceStmt->bindParam(':service_id', $data['serviceId']);
            $serviceStmt->execute();
            $service = $serviceStmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$service) {
                $this->sendResponse(404, ['error' => 'Service not found']);
                return;
            }
            
            // Prepare service data
            $serviceData = json_encode($service);
            $customerInfo = json_encode([
                'userId' => $data['userId'],
                'name' => $data['contactName'],
                'email' => $data['contactEmail'] ?? '',
                'phone' => $data['contactPhone']
            ]);
            
            $bookingDetails = json_encode([
                'checkIn' => $data['checkIn'],
                'checkOut' => $data['checkOut'],
                'guests' => $data['guests'],
                'specialRequests' => $data['specialRequests'] ?? '',
                'paymentMethod' => $data['paymentMethod']
            ]);
            
            // Calculate pricing
            $basePrice = floatval(str_replace(['PKR', ',', ' '], '', $data['totalPrice']));
            $serviceFee = 500;
            $brokerCommission = 0;
            
            if ($service['broker_id']) {
                $brokerQuery = "SELECT commission FROM brokers WHERE id = :broker_id";
                $brokerStmt = $this->conn->prepare($brokerQuery);
                $brokerStmt->bindParam(':broker_id', $service['broker_id']);
                $brokerStmt->execute();
                $broker = $brokerStmt->fetch(PDO::FETCH_ASSOC);
                
                if ($broker) {
                    $brokerCommission = ($basePrice * $broker['commission']) / 100;
                }
            }
            
            $pricing = json_encode([
                'basePrice' => $basePrice,
                'serviceFee' => $serviceFee,
                'totalAmount' => $basePrice + $serviceFee,
                'brokerCommission' => $brokerCommission
            ]);
            
            // Insert booking
            $query = "INSERT INTO bookings (id, user_id, service_id, service_data, customer_info, booking_details, pricing, check_in, check_out, guests, special_requests, contact_name, contact_phone, contact_email, payment_method, total_price, status) 
                     VALUES (:id, :user_id, :service_id, :service_data, :customer_info, :booking_details, :pricing, :check_in, :check_out, :guests, :special_requests, :contact_name, :contact_phone, :contact_email, :payment_method, :total_price, 'confirmed')";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $bookingId);
            $stmt->bindParam(':user_id', $data['userId']);
            $stmt->bindParam(':service_id', $data['serviceId']);
            $stmt->bindParam(':service_data', $serviceData);
            $stmt->bindParam(':customer_info', $customerInfo);
            $stmt->bindParam(':booking_details', $bookingDetails);
            $stmt->bindParam(':pricing', $pricing);
            $stmt->bindParam(':check_in', $data['checkIn']);
            $stmt->bindParam(':check_out', $data['checkOut']);
            $stmt->bindParam(':guests', $data['guests']);
            $stmt->bindParam(':special_requests', $data['specialRequests'] ?? '');
            $stmt->bindParam(':contact_name', $data['contactName']);
            $stmt->bindParam(':contact_phone', $data['contactPhone']);
            $stmt->bindParam(':contact_email', $data['contactEmail'] ?? '');
            $stmt->bindParam(':payment_method', $data['paymentMethod']);
            $stmt->bindParam(':total_price', $data['totalPrice']);
            
            if ($stmt->execute()) {
                // Update user stats
                $updateUserQuery = "UPDATE users SET total_bookings = total_bookings + 1, total_spent = total_spent + :amount WHERE id = :user_id";
                $updateUserStmt = $this->conn->prepare($updateUserQuery);
                $updateUserStmt->bindParam(':amount', $basePrice);
                $updateUserStmt->bindParam(':user_id', $data['userId']);
                $updateUserStmt->execute();
                
                // Update broker stats if applicable
                if ($service['broker_id'] && $brokerCommission > 0) {
                    $updateBrokerQuery = "UPDATE brokers SET total_bookings = total_bookings + 1, total_earnings = total_earnings + :commission WHERE id = :broker_id";
                    $updateBrokerStmt = $this->conn->prepare($updateBrokerQuery);
                    $updateBrokerStmt->bindParam(':commission', $brokerCommission);
                    $updateBrokerStmt->bindParam(':broker_id', $service['broker_id']);
                    $updateBrokerStmt->execute();
                }
                
                $this->conn->commit();
                
                // Return complete booking data
                $completeBooking = array_merge($data, [
                    'id' => $bookingId,
                    'service' => $service,
                    'status' => 'confirmed',
                    'bookingDate' => date('c'),
                    'bookingTime' => date('Y-m-d H:i:s'),
                    'createdAt' => date('c')
                ]);
                
                $this->sendResponse(201, [
                    'success' => true,
                    'booking' => $completeBooking,
                    'message' => 'Booking created successfully'
                ]);
            } else {
                $this->conn->rollBack();
                $this->sendResponse(500, ['error' => 'Failed to create booking']);
            }
        } catch (Exception $e) {
            $this->conn->rollBack();
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getUserBookings() {
        $userId = $_GET['user_id'] ?? '';
        
        if (!$userId) {
            $this->sendResponse(400, ['error' => 'User ID required']);
            return;
        }
        
        try {
            $query = "SELECT b.*, s.title as service_title, s.picture as service_picture, s.location as service_location, s.type as service_type, s.rating as service_rating 
                     FROM bookings b 
                     LEFT JOIN services s ON b.service_id = s.id 
                     WHERE b.user_id = :user_id 
                     ORDER BY b.booking_date DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId);
            $stmt->execute();
            
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Process bookings to include service data
            foreach ($bookings as &$booking) {
                if ($booking['service_data']) {
                    $serviceData = json_decode($booking['service_data'], true);
                    $booking['service'] = $serviceData;
                } else {
                    // Fallback to joined service data
                    $booking['service'] = [
                        'title' => $booking['service_title'],
                        'picture' => $booking['service_picture'],
                        'location' => $booking['service_location'],
                        'type' => $booking['service_type'],
                        'rating' => $booking['service_rating']
                    ];
                }
                
                if ($booking['customer_info']) {
                    $booking['customerInfo'] = json_decode($booking['customer_info'], true);
                }
                
                if ($booking['booking_details']) {
                    $booking['bookingDetails'] = json_decode($booking['booking_details'], true);
                }
                
                if ($booking['pricing']) {
                    $booking['pricing'] = json_decode($booking['pricing'], true);
                }
            }
            
            $this->sendResponse(200, [
                'success' => true,
                'bookings' => $bookings
            ]);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getAllBookings() {
        try {
            $query = "SELECT b.*, s.title as service_title, s.picture as service_picture, s.location as service_location, s.type as service_type, s.rating as service_rating,
                            u.name as user_name, u.email as user_email
                     FROM bookings b 
                     LEFT JOIN services s ON b.service_id = s.id 
                     LEFT JOIN users u ON b.user_id = u.id
                     ORDER BY b.booking_date DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Process bookings
            foreach ($bookings as &$booking) {
                if ($booking['service_data']) {
                    $serviceData = json_decode($booking['service_data'], true);
                    $booking['service'] = $serviceData;
                } else {
                    $booking['service'] = [
                        'title' => $booking['service_title'],
                        'picture' => $booking['service_picture'],
                        'location' => $booking['service_location'],
                        'type' => $booking['service_type'],
                        'rating' => $booking['service_rating']
                    ];
                }
                
                if ($booking['customer_info']) {
                    $booking['customerInfo'] = json_decode($booking['customer_info'], true);
                }
                
                if ($booking['booking_details']) {
                    $booking['bookingDetails'] = json_decode($booking['booking_details'], true);
                }
                
                if ($booking['pricing']) {
                    $booking['pricing'] = json_decode($booking['pricing'], true);
                }
            }
            
            $this->sendResponse(200, [
                'success' => true,
                'bookings' => $bookings
            ]);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getBooking() {
        $bookingId = $_GET['id'] ?? '';
        
        if (!$bookingId) {
            $this->sendResponse(400, ['error' => 'Booking ID required']);
            return;
        }
        
        try {
            $query = "SELECT b.*, s.title as service_title, s.picture as service_picture, s.location as service_location, s.type as service_type, s.rating as service_rating,
                            u.name as user_name, u.email as user_email
                     FROM bookings b 
                     LEFT JOIN services s ON b.service_id = s.id 
                     LEFT JOIN users u ON b.user_id = u.id
                     WHERE b.id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $bookingId);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $booking = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // Process booking data
                if ($booking['service_data']) {
                    $booking['service'] = json_decode($booking['service_data'], true);
                }
                
                if ($booking['customer_info']) {
                    $booking['customerInfo'] = json_decode($booking['customer_info'], true);
                }
                
                if ($booking['booking_details']) {
                    $booking['bookingDetails'] = json_decode($booking['booking_details'], true);
                }
                
                if ($booking['pricing']) {
                    $booking['pricing'] = json_decode($booking['pricing'], true);
                }
                
                $this->sendResponse(200, [
                    'success' => true,
                    'booking' => $booking
                ]);
            } else {
                $this->sendResponse(404, ['error' => 'Booking not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function updateBookingStatus() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['booking_id']) || !isset($data['status'])) {
            $this->sendResponse(400, ['error' => 'Booking ID and status required']);
            return;
        }
        
        $allowedStatuses = ['confirmed', 'pending', 'cancelled'];
        if (!in_array($data['status'], $allowedStatuses)) {
            $this->sendResponse(400, ['error' => 'Invalid status']);
            return;
        }
        
        try {
            $query = "UPDATE bookings SET status = :status WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':id', $data['booking_id']);
            
            if ($stmt->execute()) {
                $this->sendResponse(200, [
                    'success' => true,
                    'message' => 'Booking status updated successfully'
                ]);
            } else {
                $this->sendResponse(500, ['error' => 'Failed to update booking status']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function cancelBooking() {
        $bookingId = $_GET['id'] ?? '';
        
        if (!$bookingId) {
            $this->sendResponse(400, ['error' => 'Booking ID required']);
            return;
        }
        
        try {
            $query = "UPDATE bookings SET status = 'cancelled' WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $bookingId);
            
            if ($stmt->execute()) {
                $this->sendResponse(200, [
                    'success' => true,
                    'message' => 'Booking cancelled successfully'
                ]);
            } else {
                $this->sendResponse(500, ['error' => 'Failed to cancel booking']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }
}

$api = new BookingsAPI();
$api->handleRequest();
?>