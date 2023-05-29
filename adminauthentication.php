<?php
    include('connect.php');

    if(isset($_POST['register-submit'])){
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "SELECT * FROM admin_data WHERE phone = ? AND email = ?";
        $stmt = $conn->prepare($sql);
        $stmt ->execute([$phone, $email]);
        $result = $stmt->fetch();

        if($result){
            echo '<script> alert("admin already exists.") </script>';
        }else{
            $sql = "INSERT INTO admin_data (name, phone, email, password) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt ->execute([$name, $phone, $email, $hashed_password]);
            echo '<script> alert("admin registered successfully."); window.location.href = "adminauthentication.php"; </script>';
        }
    }

    if(isset($_POST['login-submit'])){
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM admin_data WHERE email = :email");
        $stmt ->bindParam(':email', $email);
        $stmt ->execute();
        $adminauth = $stmt->fetch();

        if($adminauth){
            if(password_verify($password, $adminauth['password'])){
                session_start();
                $_SESSION['adminname'] = $adminauth['email'];
                header("location: admin.php");
                exit();
            }else{
                echo "Incorrect password";
            }
        }else{
            echo "No user found with the provided email";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Authentication</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>
    
    <a href="homepage.php"><img src="Images/logo.png" alt="Website Logo" class="register-website-logo"></a>
    
    <div class="register" id="register">
        <form action="" method="POST" class="register-form">
            <div class="input-container">
                <input type="text" name="name" id="name" placeholder="Name" required>
                <input type="number" name="phone" id="phone" placeholder="Phone number" required>
                <input type="email" name="email" id="email" placeholder="Email address" required>
                <input type="password" name="password" id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z]).{7,}" title="Must contain at least one number and one lowercase letter, and at least 7 or more characters" required>
            </div>
            
            <input type="checkbox" class="checkbox" onclick="showPassword()">
            <div class="show">Show Password</div>
            <input type="submit" class="submit" name="register-submit" id="register-submit" value="Register">

            <div class="manage">Already have an account?<a href="#" onclick="showRegisterForm()"> Login</a></div>
        </form>
    </div>

    <div id="login">
        <form action="" method="POST" class="admin-login-form" style="display: none;">
            <div class="input-container">
                <input type="email" name="email" id="email" placeholder="Email address" required><br>
                <input type="password" name="password" id="password" placeholder="Password" required>
            </div>
            
            <input type="checkbox" class="checkbox" onclick="showPassword()">
            <div class="show">Show Password</div>
            <input type="submit" class="submit" name="login-submit" id="login-submit" value="Login">

            <div class="account">No account?<a href="#"> Register Here</a></div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>