<?php
    session_start();
    include 'connect.php';

    if(!isset($_SESSION['institutionemail'])){
        header('location: homepage.php');
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

    <a href="institution.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <nav class="navbar">
            <ul>
                <li><div class="scroll-to-section"><?php echo $_SESSION['institutionemail'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>

        <nav class="nav">
            <ul>
                <li><a href="institution.php" class="nav-section active">Dashboard</a></li>
                <li><a href="course.php" class="nav-section">Course</a></li>
                <li><a href="college.php?institutionId=<?php echo $_SESSION['institutionId']?>" class="nav-section">College</a></li> 
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="admin-shape-one">

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <!-- Manage Admission -->

    <div class="manage-interested-table">
    <form action="" method="POST">
        <table class="interested-container">
            <thead>
                <tr>
                    <td class="table-head-id">S.N.</td>
                    <td class="table-head">Name</td>
                    <td class="table-head">Phone Number</td>
                    <td class="table-head">Email Address</td>
                    <td class="table-head">Interested Course</td>
                    <td class="table-head">Message</td>
                </tr>
            </thead>
            <tbody>
            <?php
                $i_name = $_SESSION['institutionName'];
                @$institutionId = $_GET['institutionId'];
                $stmt= "SELECT * FROM admission_data WHERE name = :institutionName";
                $data = $conn->prepare($stmt);
                $data->bindParam(":institutionName", $i_name);
                $count = 1;
                $data->execute();
                while($row = $data->fetchObject()){ 
            ?>
            <tr>
                <td class="table-SN"><?= $count++; ?></td>
                <td class="table-body"><?= $row->username; ?></td>
                <td class="table-phone"><?= $row->phone; ?></td>
                <td class="table-body"><?= $row->email; ?></td>
                <td class="table-title"><?= $row->title; ?></td>
                <td class="table-body"><?= $row->message; ?></td>
            </tr>
            <?php 
                }
            ?>
            </tbody>
        </table>
    </form>
    </div>
    <script src="script.js"></script>
</body>