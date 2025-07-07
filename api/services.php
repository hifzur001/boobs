<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

class ServicesAPI {
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
            case 'get-cities':
                $this->getCities();
                break;
            case 'get-services':
                $this->getServices();
                break;
            case 'get-service':
                $this->getService();
                break;
            case 'add-service':
                $this->addService();
                break;
            case 'update-service':
                $this->updateService();
                break;
            case 'delete-service':
                $this->deleteService();
                break;
            case 'get-pakistan-data':
                $this->getPakistanData();
                break;
            default:
                $this->sendResponse(400, ['error' => 'Invalid action']);
        }
    }

    private function getCities() {
        try {
            $query = "SELECT * FROM cities ORDER BY name";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $this->sendResponse(200, [
                'success' => true,
                'cities' => $cities
            ]);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getServices() {
        $cityName = $_GET['city'] ?? '';
        $type = $_GET['type'] ?? '';
        $limit = $_GET['limit'] ?? 50;
        
        try {
            $query = "SELECT * FROM services WHERE 1=1";
            $params = [];
            
            if ($cityName) {
                $query .= " AND city_name = :city_name";
                $params[':city_name'] = $cityName;
            }
            
            if ($type) {
                $query .= " AND type = :type";
                $params[':type'] = $type;
            }
            
            $query .= " ORDER BY created_at DESC LIMIT :limit";
            
            $stmt = $this->conn->prepare($query);
            
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Parse JSON fields
            foreach ($services as &$service) {
                if ($service['amenities']) {
                    $service['amenities'] = json_decode($service['amenities'], true);
                }
                if ($service['includes_items']) {
                    $service['includes'] = json_decode($service['includes_items'], true);
                }
            }
            
            $this->sendResponse(200, [
                'success' => true,
                'services' => $services
            ]);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getService() {
        $serviceId = $_GET['id'] ?? '';
        
        if (!$serviceId) {
            $this->sendResponse(400, ['error' => 'Service ID required']);
            return;
        }
        
        try {
            $query = "SELECT * FROM services WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $serviceId);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $service = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // Parse JSON fields
                if ($service['amenities']) {
                    $service['amenities'] = json_decode($service['amenities'], true);
                }
                if ($service['includes_items']) {
                    $service['includes'] = json_decode($service['includes_items'], true);
                }
                
                $this->sendResponse(200, [
                    'success' => true,
                    'service' => $service
                ]);
            } else {
                $this->sendResponse(404, ['error' => 'Service not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function addService() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $required = ['title', 'type', 'location', 'city_name', 'picture', 'rating'];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                $this->sendResponse(400, ['error' => "Field $field is required"]);
                return;
            }
        }
        
        try {
            $serviceId = 'service_' . time() . '_' . rand(1000, 9999);
            
            $query = "INSERT INTO services (id, title, type, location, city_name, picture, rating, price, price_per_night, price_per_day, price_per_hour, price_per_km, description, amenities, includes_items, broker_id, broker_name, broker_phone, broker_email) 
                     VALUES (:id, :title, :type, :location, :city_name, :picture, :rating, :price, :price_per_night, :price_per_day, :price_per_hour, :price_per_km, :description, :amenities, :includes_items, :broker_id, :broker_name, :broker_phone, :broker_email)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $serviceId);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':type', $data['type']);
            $stmt->bindParam(':location', $data['location']);
            $stmt->bindParam(':city_name', $data['city_name']);
            $stmt->bindParam(':picture', $data['picture']);
            $stmt->bindParam(':rating', $data['rating']);
            $stmt->bindParam(':price', $data['price'] ?? null);
            $stmt->bindParam(':price_per_night', $data['price_per_night'] ?? null);
            $stmt->bindParam(':price_per_day', $data['price_per_day'] ?? null);
            $stmt->bindParam(':price_per_hour', $data['price_per_hour'] ?? null);
            $stmt->bindParam(':price_per_km', $data['price_per_km'] ?? null);
            $stmt->bindParam(':description', $data['description'] ?? null);
            $stmt->bindParam(':amenities', isset($data['amenities']) ? json_encode($data['amenities']) : null);
            $stmt->bindParam(':includes_items', isset($data['includes']) ? json_encode($data['includes']) : null);
            $stmt->bindParam(':broker_id', $data['broker_id'] ?? null);
            $stmt->bindParam(':broker_name', $data['broker_name'] ?? null);
            $stmt->bindParam(':broker_phone', $data['broker_phone'] ?? null);
            $stmt->bindParam(':broker_email', $data['broker_email'] ?? null);
            
            if ($stmt->execute()) {
                $this->sendResponse(201, [
                    'success' => true,
                    'service_id' => $serviceId,
                    'message' => 'Service created successfully'
                ]);
            } else {
                $this->sendResponse(500, ['error' => 'Failed to create service']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function getPakistanData() {
        try {
            // Get all cities with their services
            $query = "SELECT c.*, 
                            (SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', s.id,
                                    'title', s.title,
                                    'type', s.type,
                                    'location', s.location,
                                    'picture', s.picture,
                                    'rating', s.rating,
                                    'price', s.price,
                                    'price_per_night', s.price_per_night,
                                    'price_per_day', s.price_per_day,
                                    'price_per_hour', s.price_per_hour,
                                    'price_per_km', s.price_per_km,
                                    'description', s.description,
                                    'amenities', s.amenities,
                                    'includes', s.includes_items,
                                    'broker_id', s.broker_id,
                                    'broker_name', s.broker_name,
                                    'broker_phone', s.broker_phone,
                                    'broker_email', s.broker_email
                                )
                            ) FROM services s WHERE s.city_name = c.name) as services
                     FROM cities c ORDER BY c.name";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Process the data to match the expected format
            $pakistanData = [
                'Pakistan' => [
                    'cities' => []
                ]
            ];
            
            foreach ($cities as $city) {
                $services = json_decode($city['services'] ?? '[]', true) ?: [];
                
                // Parse JSON fields in services
                foreach ($services as &$service) {
                    if (isset($service['amenities']) && is_string($service['amenities'])) {
                        $service['amenities'] = json_decode($service['amenities'], true) ?: [];
                    }
                    if (isset($service['includes']) && is_string($service['includes'])) {
                        $service['includes'] = json_decode($service['includes'], true) ?: [];
                    }
                }
                
                $pakistanData['Pakistan']['cities'][] = [
                    'name' => $city['name'],
                    'description' => $city['description'],
                    'image_url' => $city['image_url'],
                    'services' => $services
                ];
            }
            
            $this->sendResponse(200, [
                'success' => true,
                'data' => $pakistanData
            ]);
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

$api = new ServicesAPI();
$api->handleRequest();
?>