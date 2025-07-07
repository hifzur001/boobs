<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

class AuthAPI {
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
            case 'login':
                $this->login();
                break;
            case 'register':
                $this->register();
                break;
            case 'admin-login':
                $this->adminLogin();
                break;
            case 'broker-login':
                $this->brokerLogin();
                break;
            case 'logout':
                $this->logout();
                break;
            case 'verify-session':
                $this->verifySession();
                break;
            default:
                $this->sendResponse(400, ['error' => 'Invalid action']);
        }
    }

    private function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email']) || !isset($data['password'])) {
            $this->sendResponse(400, ['error' => 'Email and password required']);
            return;
        }

        try {
            $query = "SELECT * FROM users WHERE email = :email AND status = 'active'";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $data['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data['password'], $user['password'])) {
                    $sessionToken = $this->createSession($user['id'], 'user');
                    
                    unset($user['password']);
                    $user['sessionToken'] = $sessionToken;
                    
                    $this->sendResponse(200, [
                        'success' => true,
                        'user' => $user,
                        'message' => 'Login successful'
                    ]);
                } else {
                    $this->sendResponse(401, ['error' => 'Invalid credentials']);
                }
            } else {
                $this->sendResponse(401, ['error' => 'User not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function register() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $required = ['name', 'email', 'phone', 'password'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $this->sendResponse(400, ['error' => "Field $field is required"]);
                return;
            }
        }

        try {
            // Check if user already exists
            $query = "SELECT id FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $data['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $this->sendResponse(409, ['error' => 'User already exists']);
                return;
            }

            // Create new user
            $userId = 'user_' . time() . '_' . rand(1000, 9999);
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

            $query = "INSERT INTO users (id, name, email, phone, password) VALUES (:id, :name, :email, :phone, :password)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $userId);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':phone', $data['phone']);
            $stmt->bindParam(':password', $hashedPassword);

            if ($stmt->execute()) {
                $sessionToken = $this->createSession($userId, 'user');
                
                $this->sendResponse(201, [
                    'success' => true,
                    'user' => [
                        'id' => $userId,
                        'name' => $data['name'],
                        'email' => $data['email'],
                        'phone' => $data['phone'],
                        'sessionToken' => $sessionToken
                    ],
                    'message' => 'Registration successful'
                ]);
            } else {
                $this->sendResponse(500, ['error' => 'Failed to create user']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function adminLogin() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email']) || !isset($data['password'])) {
            $this->sendResponse(400, ['error' => 'Email and password required']);
            return;
        }

        try {
            $query = "SELECT * FROM admins WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $data['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $admin = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data['password'], $admin['password'])) {
                    // Update last login
                    $updateQuery = "UPDATE admins SET last_login = NOW() WHERE id = :id";
                    $updateStmt = $this->conn->prepare($updateQuery);
                    $updateStmt->bindParam(':id', $admin['id']);
                    $updateStmt->execute();

                    $sessionToken = $this->createSession($admin['id'], 'admin');
                    
                    unset($admin['password']);
                    $admin['sessionToken'] = $sessionToken;
                    $admin['loginTime'] = date('c');
                    
                    $this->sendResponse(200, [
                        'success' => true,
                        'admin' => $admin,
                        'message' => 'Admin login successful'
                    ]);
                } else {
                    $this->sendResponse(401, ['error' => 'Invalid credentials']);
                }
            } else {
                $this->sendResponse(401, ['error' => 'Admin not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function brokerLogin() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email']) || !isset($data['password'])) {
            $this->sendResponse(400, ['error' => 'Email and password required']);
            return;
        }

        try {
            $query = "SELECT * FROM brokers WHERE email = :email AND status = 'active'";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $data['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $broker = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data['password'], $broker['password'])) {
                    $sessionToken = $this->createSession($broker['id'], 'broker');
                    
                    unset($broker['password']);
                    $broker['sessionToken'] = $sessionToken;
                    $broker['loginTime'] = date('c');
                    
                    $this->sendResponse(200, [
                        'success' => true,
                        'broker' => $broker,
                        'message' => 'Broker login successful'
                    ]);
                } else {
                    $this->sendResponse(401, ['error' => 'Invalid credentials']);
                }
            } else {
                $this->sendResponse(401, ['error' => 'Broker not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function logout() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        
        if ($token) {
            $token = str_replace('Bearer ', '', $token);
            
            try {
                $query = "DELETE FROM user_sessions WHERE session_token = :token";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':token', $token);
                $stmt->execute();
                
                $this->sendResponse(200, ['success' => true, 'message' => 'Logged out successfully']);
            } catch (Exception $e) {
                $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            $this->sendResponse(400, ['error' => 'No session token provided']);
        }
    }

    private function verifySession() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        
        if (!$token) {
            $this->sendResponse(401, ['error' => 'No session token provided']);
            return;
        }

        $token = str_replace('Bearer ', '', $token);
        
        try {
            $query = "SELECT us.*, u.name, u.email FROM user_sessions us 
                     LEFT JOIN users u ON us.user_id = u.id AND us.user_type = 'user'
                     LEFT JOIN admins a ON us.user_id = a.id AND us.user_type = 'admin'
                     LEFT JOIN brokers b ON us.user_id = b.id AND us.user_type = 'broker'
                     WHERE us.session_token = :token AND us.expires_at > NOW()";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':token', $token);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $session = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->sendResponse(200, [
                    'valid' => true,
                    'user_type' => $session['user_type'],
                    'user_id' => $session['user_id']
                ]);
            } else {
                $this->sendResponse(401, ['valid' => false, 'error' => 'Invalid or expired session']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    private function createSession($userId, $userType) {
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        try {
            // Clean up old sessions
            $cleanupQuery = "DELETE FROM user_sessions WHERE user_id = :user_id AND user_type = :user_type";
            $cleanupStmt = $this->conn->prepare($cleanupQuery);
            $cleanupStmt->bindParam(':user_id', $userId);
            $cleanupStmt->bindParam(':user_type', $userType);
            $cleanupStmt->execute();
            
            // Create new session
            $query = "INSERT INTO user_sessions (user_id, user_type, session_token, expires_at) VALUES (:user_id, :user_type, :token, :expires_at)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId);
            $stmt->bindParam(':user_type', $userType);
            $stmt->bindParam(':token', $token);
            $stmt->bindParam(':expires_at', $expiresAt);
            $stmt->execute();
            
            return $token;
        } catch (Exception $e) {
            throw new Exception('Failed to create session: ' . $e->getMessage());
        }
    }

    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }
}

$api = new AuthAPI();
$api->handleRequest();
?>