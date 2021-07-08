<?php

class Auth {
    private const TIMEOUT = 3600; // segundos

    private function __construct() {}

    public static function login(StdClass $user): void {
        self::startSession();
        $_SESSION[ 'user' ] = $user;
        $_SESSION[ 'last_access' ] = time();
    }
    
    public static function logout(): void {
        self::startSession();
        session_destroy();
    }

    public static function isLoggedIn(): bool {
        self::startSession();
        return self::checkUser() && self::checkTimeout();
    }

    public static function startSession(): void {
        if (session_status() == PHP_SESSION_NONE) { // pq saltan Notice si se inicia una sesión ya iniciada. 
            session_start();
        }
    }

    private static function checkUser(): bool {
        return isset($_SESSION[ 'user' ]);
    }

    private static function checkTimeout(): bool {
        if (time() - $_SESSION[ 'last_access']  > self::TIMEOUT) {
            session_destroy();
            return false;
        }
        else {
            $_SESSION[ 'last_access' ] = time();
            return true;
        }
    }
}