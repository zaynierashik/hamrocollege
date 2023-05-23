<?php
    session_start();
    include 'connect.php';

    if(!isset($_SESSION['adminname'])){
        header('location: homepage.php');
    }

    $adminCount = $conn->query("SELECT COUNT(adminId) FROM admin_data") -> fetchColumn();
    $courseCount = $conn->query("SELECT COUNT(courseId) FROM course_data") -> fetchColumn();
    $userCount = $conn->query("SELECT COUNT(userId) FROM user_data") -> fetchColumn();
    $collegeCount = $conn->query("SELECT COUNT(collegeId) FROM college_data") -> fetchColumn();
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

    <a href="admin.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <nav class="navbar">
            <ul>
                <li><div class="scroll-to-section"><?php echo $_SESSION['adminname'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>

        <!-- <nav class="nav">
            <ul>
                <li><a href="admin.php" class="nav-section active">Dashboard</a></li>
                <li><a href="#" class="nav-section" id="admin-option">Add Admin</a></li>
            </ul>
        </nav> -->
    </div>
    
    <img src="Images/shape1.png" class="admin-shape-one">

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <div class="count-grid-container">
        <p class="count-grid-item" onclick="showManageTable('manage-admin-table')" style="color: white;">
            <i class="fa-solid fa-user fa-lg" style="color: #ffffff;"></i><br>
            Total admin: <?php echo $adminCount ?>
        </p>

        <p class="count-grid-item" onclick="showManageTable('manage-user-table')">
            <i class="fa-solid fa-user fa-lg" style="color: #000000;"></i><br>
            Total user: <?php echo $userCount ?>
        </p>

        <p class="count-grid-item" onclick="showManageTable('manage-course-table')">
            <i class="fa-sharp fa-solid fa-graduation-cap fa-lg" style="color: #000000;"></i><br>
            Total course: <?php echo $courseCount ?>
        </p>

        <p class="count-grid-item" onclick="showManageTable('manage-college-table')">
            <i class="fa-solid fa-building-columns fa-lg" style="color: #000000;"></i><br>
            Total college: <?php echo $collegeCount ?>
        </p>

        <p class="count-grid-item" onclick="showManageTable('register')">
            <i class="fa-solid fa-user-plus fa-lg" style="color: #000000;"></i><br>
            Add Admin
        </p>

        <p class="count-grid-item" onclick="showManageTable('feedback')">
            <i class="fa-solid fa-message fa-lg" style="color: #000000;"></i><br>
            View Feedback
        </p>
    </div>

    <!-- Manage Admin -->

    <div class="manage-detail-table" id="manage-admin-table" style="display: none;">
        <!-- <button name="remove"><i class="fa-solid fa-trash-can" style="color: #cc0000;"></i></button> -->
        <table class="user-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Name</td>
                    <td class="table-head">Phone number</td>
                    <td class="table-head">Email address</td>
                    <!-- <td class="table-head-id"></td> -->
                </tr>
            </thead>
            <tbody>
            <?php
                $stmt= "SELECT * FROM admin_data" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->name; ?></td>
                <td class="table-phone"><?= $row->phone; ?></td>
                <td class="table-body"><?= $row->email; ?></td>
                <!-- <td class="checkBox"><input type="checkbox" name=userId[] value=<?= $row->userId; ?>></td> -->
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </div>

    <!-- Manage User -->

    <div class="manage-detail-table" id="manage-user-table" style="display: none;">
        <!-- <button name="remove"><i class="fa-solid fa-trash-can" style="color: #cc0000;"></i></button> -->
        <table class="user-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Name</td>
                    <td class="table-head">Phone number</td>
                    <td class="table-head">Email address</td>
                    <!-- <td class="table-head-id"></td> -->
                </tr>
            </thead>
            <tbody>
            <?php
                $stmt= "SELECT * FROM user_data" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->name; ?></td>
                <td class="table-phone"><?= $row->phone; ?></td>
                <td class="table-body"><?= $row->email; ?></td>
                <!-- <td class="checkBox"><input type="checkbox" name=userId[] value=<?= $row->userId; ?>></td> -->
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </div>

    <!-- Manage Course -->

    <div class="manage-detail-table" id="manage-course-table">
        <!-- <button name="remove"><i class="fa-solid fa-trash-can" style="color: #cc0000;"></i></button> -->
        <table class="user-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Course Name</td>
                    <td class="table-head">Abbreviation</td>
                    <!-- <td class="table-head-id"></td> -->
                </tr>
            </thead>
            <tbody>
            <?php
                $stmt= "SELECT * FROM course_data" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->title; ?></td>
                <td class="table-phone"><?= $row->abbreviation; ?></td>
                <!-- <td class="checkBox"><input type="checkbox" name=userId[] value=<?= $row->userId; ?>></td> -->
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </div>

    <!-- Manage Colleges -->

    <div class="manage-college-table" id="manage-college-table" style="display: none;">
        <!-- <button name="remove"><i class="fa-solid fa-trash-can" style="color: #cc0000;"></i></button> -->
        <table class="user-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Name</td>
                    <td class="table-head">Phone number</td>
                    <td class="table-head">Email address</td>
                    <!-- <td class="table-head-id"></td> -->
                </tr>
            </thead>
            <tbody>
            <?php
                $stmt= "SELECT * FROM college_data" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-name"><?= $row->name; ?></td>
                <td class="table-phone"><?= $row->phone; ?></td>
                <td class="table-email"><?= $row->email; ?></td>
                <!-- <td class="checkBox"><input type="checkbox" name=userId[] value=<?= $row->userId; ?>></td> -->
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </div>

    <!-- Admin Registration -->

    <div class="register" id="register" style="display: none;">
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
        </form>
    </div>

    <!-- Feedback -->

    <div class="manage-detail-table" id="manage-feedback-table" style="display: none;">
        <table class="user-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Name</td>
                    <td class="table-head">Email address</td>
                    <td class="table-head">Feedback</td>
                </tr>
            </thead>
            <tbody>
            <?php
                $stmt= "SELECT * FROM feedback_data" ;
                $data = $conn->query($stmt);
                $count = 1;
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->username; ?></td>
                <td class="table-phone"><?= $row->email; ?></td>
                <td class="table-body"><?= $row->feedback; ?></td>
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </div>

    <script src="script.js"></script>
    <script>
        var currentManageTable = document.getElementById("manage-course-table");

        function showManageTable(tableId){
            var manageTable = document.getElementById(tableId);
            if(currentManageTable !== null && currentManageTable !== manageTable){
                currentManageTable.style.display = "none";
            }

            if(manageTable.style.display === "none"){
                manageTable.style.display = "block";
                currentManageTable = manageTable;
            }else{
                manageTable.style.display = "none";
                currentManageTable = null;
            }
        }

        function hideAllManageTables(){
            var manageTables = document.getElementsByClassName("manage-user-table");
            for(var i = 0; i < manageTables.length; i++){
                manageTables[i].style.display = "none";
            }
            currentManageTable = null;
        }
        currentManageTable.style.display = "block";
    </script>
</body>
</html>