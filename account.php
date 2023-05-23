<?php
    session_start();
    include 'connect.php';

    $i_id = $_GET['userId'];

    if(!isset($_SESSION['username'])){
        header('location: homepage.php');
    }

    if(isset($_POST['update-submit'])){
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("UPDATE user_data SET name = :name, phone = :phone, email = :email, password = :password WHERE userId = :userId");
        $stmt ->bindParam(':name', $name);
        $stmt ->bindParam(':phone', $phone);
        $stmt ->bindParam(':email', $email);
        $stmt ->bindParam(':password', $hashed_password);
        $stmt ->bindParam(':userId', $i_id);
        $stmt ->execute();
        header('location: user.php');
    }

    if(isset($_POST['delete'])){
        $stmt = $conn->prepare("DELETE FROM user_data WHERE userId = :userId");
        $stmt->bindParam(':userId', $i_id);
        $stmt->execute();

        session_destroy();
        echo '<script>alert("Account deleted successfully."); window.location.href = "homepage.php";</script>';
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamro College</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>

    <!-- Main Page -->

    <a href="user.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <nav class="navbar">
            <ul>
                <li><a href="account.php?userId=<?php echo $_SESSION['userId'];?>"><i class="fa-solid fa-user" style="color: #000000; position: relative; left: 1.5vw"></i></a></li>
                <li><div class="scroll-to-section"><?php echo $_SESSION['username'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="account-shape-one">

    <!-- Manage Account -->

    <form action="" method="POST">
        <i class="fa-solid fa-trash" name="delete"></i>
    </form>

    <div class="account-form" id="register">
        <form action="" method="POST">
            <p class="manage-title">MANAGE ACCOUNT</p>
            <?php
                $stmt = $conn->prepare("SELECT * FROM user_data WHERE userId = :userId");
                $stmt ->bindParam(':userId', $i_id);
                $stmt ->execute();
                $value = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($value as $row){?>

            <div class="input-container">
                <input type="text" name="name" id="name" placeholder="Name" value="<?php echo $row['name'];?>" readonly>
                <input type="number" name="phone" id="phone" placeholder="Phone number" value="<?php echo $row['phone'];?>" required>
                <input type="email" name="email" id="email" placeholder="Email address" value="<?php echo $row['email'];?>" required>
                <input type="password" name="password" id="password" placeholder="New Password" pattern="(?=.*\d)(?=.*[a-z]).{7,}" title="Must contain at least one number and one lowercase letter, and at least 7 or more characters" required>
            </div>
            
            <input type="checkbox" class="checkbox" onclick="showPassword()">
            <div class="show">Show Password</div>
            <input type="submit" class="submit" name="update-submit" id="update-submit" value="Save Profile">
            <?php } ?>
        </form>
    </div>

    <!-- Submitted Form -->

    <div class="manage-admission-table" id="manage-admission-table">
        <table>
        <thead>
            <tr>
                <td class="table-head-id">S.N.</td>
                <td class="table-head">Name</td>
                <td class="table-head">Course</td>
            </tr>
        </thead>
        <tbody>
            <?php
                $stmt= "SELECT * FROM admission_data WHERE email = '".$_SESSION['username']."'" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->name; ?></td>
                <td class="table-title"><?= $row->title; ?></td>
            </tr>
            <?php 
                }
            ?>
        </tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>
</html>