<?php
    session_start();
    include 'connect.php';

    if (!isset($_SESSION['institutionemail'])) {
        header('location: homepage.php');
        exit();
    }

    $institutionId = $_SESSION['institutionId'];
    $stmt = $conn->prepare("SELECT * FROM admission_data WHERE collegeId = :institutionId");
    $stmt ->bindParam(':institutionId', $institutionId);
    $stmt ->execute();
    $admissionData = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Institution Panel</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <style>
        .white-row{
            background-color: #ffffff;
        }

        .black-row{
            background-color: #e6e9ef;
        }
    </style>
</head>
<body>
    <!-- Main Page -->

    <a href="institution.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>

    <div class="main-navbar">
        <nav class="navbar">
            <ul>
                <li>
                    <div class="scroll-to-section"><?php echo $_SESSION['institutionemail'] ?></div>
                </li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>

        <nav class="nav">
            <ul>
                <li><a href="institution.php" class="nav-section active">Dashboard</a></li>
                <li><a href="course.php" class="nav-section">Course</a></li>
                <li><a href="college.php?institutionId=<?php echo $_SESSION['institutionId'] ?>" class="nav-section">College</a></li>
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
                        <!-- <td class="table-head">Message</td> -->
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $count = 1;
                    foreach ($admissionData as $row) {
                        $row_class = ($count % 2 == 0) ? "black-row" : "white-row";
                    ?>
                        <tr class="<?= $row_class ?>">
                            <td class="table-SN"><?= $count++; ?></td>
                            <td class="table-body"><?= $row['username']; ?></td>
                            <td class="table-phone"><?= $row['phone']; ?></td>
                            <td class="table-body"><?= $row['email']; ?></td>
                            <td class="table-title"><?= $row['title']; ?></td>
                            <!-- <td class="table-body"><?= $row['message']; ?></td> -->
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
</html>