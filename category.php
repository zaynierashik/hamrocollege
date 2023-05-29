<?php
    session_start();
    include('connect.php');

    if(isset($_GET['affiliation'])){
        $affiliation = $_GET['affiliation'];
    
        $sql = "SELECT * FROM college_data WHERE affiliation = :affiliation";
        $stmt = $conn->prepare($sql);
        $stmt ->bindParam(':affiliation', $affiliation);
        $stmt ->execute();
        $colleges = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    if(isset($_GET['field'])){
        $field = $_GET['field'];
    
        $sql = "SELECT * FROM course_data WHERE field = :field";
        $stmt = $conn->prepare($sql);
        $stmt ->bindParam(':field', $field);
        $stmt ->execute();
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>

    <a href="user.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <!-- <form action="search.php" method="POST" id="search">
            <input type="text" class="search-box" name="search" id="search-form" placeholder="Search courses, colleges ...">
            <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
        </form> -->
        
        <nav class="navbar">
            <ul>
                <li><a href="account.php?userId=<?php echo $_SESSION['userId'];?>"><i class="fa-solid fa-user" style="color: #000000; position: relative; left: 1.5vw"></i></a></li>
                <li><div class="scroll-to-section"><?php echo $_SESSION['username'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="admin-shape-one">

    <!-- Colleges -->

    <?php
    if(isset($affiliation) && !empty($colleges)): ?>
        <div class="colleges" id="colleges">
        <p class="category-college-title">COLLEGES</p>
        <div class="college-grid-container">
            <?php
                foreach($colleges as $college):
            ?>
                <a href="collegedetails.php?collegeId=<?php echo $college['collegeId']; ?>" class="college-grid-item">
                    <img src="./Images/<?php echo $college['logo']; ?>">
                    <p class="college-name"><?php echo $college['name']; ?></p>
                    <p class="college-address"><?php echo $college['address']; ?></p>
                </a>
            <?php endforeach; ?>
        </div>
        </div>
    <?php endif; ?>

    <!-- Courses -->

    <?php
    if(isset($field) && !empty($courses)): ?>
        <div class="courses" id="courses">
        <p class="category-course-title">COURSES</p>
        <div class="course-grid-container">
            <?php
                foreach($courses as $course):
            ?>
                <a href="coursedetails.php?courseId=<?php echo $course['courseId']; ?>" class="course-grid-item"><?php echo $course['title']; ?></a>
            <?php endforeach; ?>
        </div>
        </div>
    <?php endif; ?>

</body>
</html>