flowchart TD
    %% Client Zone
    subgraph "Client Zone"
        subgraph "End-User Interface" 
            EU_Pages["HTML Pages: index.html, booking.html, confirmation.html, my-bookings.html, destinations.html, services.html, about.html, contact.html"]:::frontend
            EU_JS["JS: booking.js, confirmation.js, my-bookings.js, destinations.js, services.js, script.js"]:::frontend
            EU_CSS["CSS: style.css"]:::frontend
        end
        subgraph "Broker Interface"
            BR_Pages["HTML Pages: broker-login.html, broker-panel.html"]:::frontend
            BR_JS["JS: broker-script.js"]:::frontend
            BR_CSS["CSS: broker-style.css"]:::frontend
        end
        subgraph "Admin Interface"
            AD_Pages["HTML Pages: admin-login.html, admin-login-updated.html, admin-panel.html"]:::frontend
            AD_JS["JS: admin-script.js"]:::frontend
            AD_CSS["CSS: admin-style.css"]:::frontend
        end
        subgraph "Static Assets"
            Fonts["Fonts"]:::static
            Images["Images"]:::static
            APIClient["Shared JS: api-client.js"]:::static
        end
    end

    %% Server Zone
    subgraph "Server Zone"
        StaticServer["Static Asset Server (Apache/Nginx)"]:::backend
        subgraph "PHP Application (API Layer)"
            AuthAPI["Auth API (api/auth.php)"]:::backend
            ServicesAPI["Services API (api/services.php)"]:::backend
            BookingsAPI["Bookings API (api/bookings.php)"]:::backend
            DBConfig["DB Config (config/database.php)"]:::backend
        end
    end

    %% Database Zone
    subgraph "Database Zone"
        MySQL["MySQL Database"]:::database
        Migrations["Migrations (supabase/migrations)"]:::database
    end

    %% Connections
    EU_Pages -->|HTTPS request| StaticServer
    BR_Pages -->|HTTPS request| StaticServer
    AD_Pages -->|HTTPS request| StaticServer
    APIClient -->|AJAX/Fetch| AuthAPI
    APIClient -->|AJAX/Fetch| ServicesAPI
    APIClient -->|AJAX/Fetch| BookingsAPI
    AuthAPI -->|PDO queries| MySQL
    ServicesAPI -->|PDO queries| MySQL
    BookingsAPI -->|PDO queries| MySQL
    DBConfig -->|connects| MySQL
    Migrations -->|schema| MySQL

    %% Click Events
    click EU_Pages "https://github.com/hifzur001/boobs/blob/master/index.html"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/booking.js"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/confirmation.js"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/my-bookings.js"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/destinations.js"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/services.js"
    click EU_JS "https://github.com/hifzur001/boobs/blob/master/js/script.js"
    click EU_CSS "https://github.com/hifzur001/boobs/blob/master/style.css"
    click BR_Pages "https://github.com/hifzur001/boobs/blob/master/broker-login.html"
    click BR_Pages "https://github.com/hifzur001/boobs/blob/master/broker-panel.html"
    click BR_JS "https://github.com/hifzur001/boobs/blob/master/broker-script.js"
    click BR_CSS "https://github.com/hifzur001/boobs/blob/master/broker-style.css"
    click AD_Pages "https://github.com/hifzur001/boobs/blob/master/admin-login.html"
    click AD_Pages "https://github.com/hifzur001/boobs/blob/master/admin-login-updated.html"
    click AD_Pages "https://github.com/hifzur001/boobs/blob/master/admin-panel.html"
    click AD_JS "https://github.com/hifzur001/boobs/blob/master/admin-script.js"
    click AD_CSS "https://github.com/hifzur001/boobs/blob/master/admin-style.css"
    click Fonts "https://github.com/hifzur001/boobs/blob/master/font/Astrid.otf"
    click Fonts "https://github.com/hifzur001/boobs/blob/master/font/brillant.otf"
    click Images "https://github.com/hifzur001/boobs/tree/master/img/"
    click APIClient "https://github.com/hifzur001/boobs/blob/master/js/api-client.js"
    click AuthAPI "https://github.com/hifzur001/boobs/blob/master/api/auth.php"
    click ServicesAPI "https://github.com/hifzur001/boobs/blob/master/api/services.php"
    click BookingsAPI "https://github.com/hifzur001/boobs/blob/master/api/bookings.php"
    click DBConfig "https://github.com/hifzur001/boobs/blob/master/config/database.php"
    click Migrations "https://github.com/hifzur001/boobs/blob/master/supabase/migrations/20250707193220_small_mode.sql"
    click Migrations "https://github.com/hifzur001/boobs/tree/master/supabase/migrations"

    %% Styles
    classDef frontend fill:#E8F0FE,stroke:#4285F4,stroke-width:1px
    classDef backend fill:#FFF4E5,stroke:#FB8C00,stroke-width:1px
    classDef database fill:#E8F5E9,stroke:#43A047,stroke-width:1px
    classDef static fill:#F3E5F5,stroke:#8E24AA,stroke-width:1px
