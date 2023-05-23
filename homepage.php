<?php
    session_start();
    include 'connect.php';

    if(isset($_SESSION['username'])){
        header("location: user.php");
        exit;
    }elseif(isset($_SESSION['institutionemail'])){
        header("location: institution.php");
        exit;
    }

    if(isset($_POST['login-submit'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
    
        $stmt = $conn->prepare("SELECT * FROM authentication WHERE email=:email");
        $stmt ->bindParam(':email', $email);
        $stmt ->execute();
        $userauth = $stmt->fetch();
    
        if($userauth){
            if($userauth['role'] == 'institution' && password_verify($password, $userauth['password'])){
                $_SESSION['institutionemail'] = $userauth['email'];
                $_SESSION['institutionName'] = $userauth['name'];

                $stmt2 = $conn->prepare("SELECT * FROM institution_data WHERE email=:email");
                $stmt2 ->bindParam(':email', $userauth['email']);
                $stmt2 ->execute();
                $userauthentication = $stmt2->fetch();

                $_SESSION['institutionId'] = $userauthentication['institutionId'];
                header("location: institution.php");
                exit;
            }
            elseif($userauth['role'] == 'user' && password_verify($password, $userauth['password'])){
                $_SESSION['username'] = $userauth['email'];

                $stmt3 = $conn->prepare("SELECT * FROM user_data WHERE email=:email");
                $stmt3 ->bindParam(':email', $userauth['email']);
                $stmt3 ->execute();
                $userauthentication = $stmt3->fetch();

                $_SESSION['userId'] = $userauthentication['userId'];
                header("location: user.php");
                exit;
            }
        }else{
            echo "Invalid email or password.";
        }
    }
     
    $courseId;
    $i = 0;
    $searchValue;
    @$count = $_GET['count'];
    @$status = $_GET['status'];

    do{
        @$courseId = $_GET[$i];
        @$collegeId = $_GET[$i];

        if($courseId != null){
            if($status == 1){
                $stmt = $conn->prepare("SELECT * FROM course_data WHERE courseId = :courseId");
                $stmt ->bindParam(':courseId', $courseId);
            }else{
                $stmt = $conn->prepare("SELECT * FROM college_data WHERE collegeId = :collegeId");
                $stmt ->bindParam(':collegeId', $collegeId);
            }

            $stmt ->execute();
            $value[$i] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $searchValue = true;
        }else{
            $searchValue = false;
        }
        $i++;
    }while($i<$count);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamro College</title>
    <link rel="stylesheet" href="homepage.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>

<body>
    <!-- Search Results -->

    <?php
        if($searchValue){?>
            <a href="homepage.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
            
            <div class="main-navbar">
                <form action="search.php" method="POST" id="search">
                    <input type="text" class="search-box-search" name="search" id="search-form" placeholder="Search courses, colleges ...">
                    <i class="fa-solid fa-magnifying-glass search-icon" id="search-icon"></i>
                </form>
            </div>

            <img src="Images/shape1.png" class="search-shape-one">
            <div class="result">Found results.</div>
            <?php
                echo '<div class="search-grid-container">';
                foreach($value as $item){
                    if($status == 1){
                        echo '<a href="coursedetails.php?courseId=' . $item[0]['courseId'] . '" class="search-grid-item">' . $item[0]['title'] . '</a>';
                    }
                    else{
                        echo '<a href="collegedetails.php?collegeId=' . $item[0]['collegeId'] . '" class="search-grid-item">';
                        echo '<img src="./Images/' . $item[0]['logo'] . '">';
                        echo '<p class="search-name">' . $item[0]['name'] . '</p>';
                        echo '<p class="search-address">' . $item[0]['address'] . '</p>';
                        echo '</a>';
                    }
                }
                echo '</div>';
            ?>
        <?php 
        }else{ 
    ?>

    <!-- Main Page -->

    <a href="homepage.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <form action="search.php" method="POST" id="search">
            <input type="text" class="search-box" name="search" id="search-form" placeholder="Search courses, colleges ...">
            <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
        </form>
        
        <nav class="navbar">
            <ul>
                <li><a href="register.php" class="scroll-to-section">REGISTER</a></li>
                <button id="modal-btn" class="login-button">LOGIN</button>
            </ul>
        </nav>
    </div>

    <div id="my-modal" class="modal">
        <form action="" method="POST" class="login-form">
            <div class="input-container">
                <input type="email" name="email" id="email" placeholder="Email address" required><br>
                <input type="password" name="password" id="password" placeholder="Password" required>
            </div>
            
            <input type="checkbox" class="checkbox" onclick="showPassword()">
            <div class="show">Show Password</div>
    
            <input type="submit" class="submit" name="login-submit" id="login-submit" value="Login">
            <i class="fa-solid fa-xmark fa-lg" style="color: black;"></i>
        </form>
    </div>
    
    <div class="home-content">
        <img src="Images/shape1.png" class="shape-one">
        <img src="Images/icon.png" class="icon-one" alt="Illustration">
        <p class="explore">Explore. Enroll.</p>
        <p class="explore-text">Searching for colleges to expand your study? Explore some of the best <br> colleges around you.</p>
    </div>

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <!-- Courses -->

    <div class="courses" id="courses">
        <p class="course-title">COURSES</p>
        <div class="course-grid-container">
        <?php
            $sql = "SELECT * FROM course_data LIMIT 7";
            $stmt = $conn->query($sql);

            if($stmt->rowCount() > 0){
                while($row = $stmt->fetch()){
                    echo '<a href="coursedetails.php?courseId=' . $row['courseId'] . '" class="course-grid-item">' . $row['title'] . '</a>';
                }
                echo '<a href="register.php" class="course-grid-item">Explore more courses<i class="fa-solid fa-chevron-right fa-sm" style="color: #082465;"></i></a>';
                echo '</div>';
            }else{
                echo "No courses found.";
            }
        ?>
    </div>
    
    <!-- Colleges -->
    
    <div class="colleges" id="colleges">
        <p class="college-title">COLLEGES</p>
        <div class="college-grid-container">
            <?php
                $sql = "SELECT * FROM college_data LIMIT 7";
                $stmt = $conn->query($sql);
                
                if($stmt->rowCount() > 0){
                    while ($row = $stmt->fetch()) {
                        echo '<a href="collegedetails.php?collegeId=' . $row['collegeId'] . '" class="college-grid-item">';
                        echo '<img src="./Images/' . $row['logo'] . '">';
                        echo '<p class="college-name">' . $row['name'] . '</p>';
                        echo '<p class="college-address">' . $row['address'] . '</p>';
                        echo '</a>';
                    }
                    echo '<a href="register.php" class="college-grid-item explore-more">Explore more colleges<i class="fa-solid fa-chevron-right fa-sm" style="color: #082465;"></i></a>';
                    echo '</div>';
                }else{
                    echo "No colleges found.";
                }
            ?>
        </div>
        <img src="Images/shape2.png" class="shape-two">
    </div>

    <!-- Links -->

    <div class="links">
        <p class="link-title">LINKS</p>
        <div class="link-grid-container">
            <a href="http://www.tribhuvan-university.edu.np/" target="_blank"><img src="Images/tu.png" alt="Tribhuvan University" class="link-grid-item">Tribhuvan University</a>
            <a href="https://ku.edu.np/" target="_blank"><img src="Images/ku.png" alt="Kathmandu University" class="link-grid-item">Kathmandu University</a>
            <a href="https://pu.edu.np/" target="_blank"><img src="Images/pu.jpeg" alt="Pokhara University" class="link-grid-item">Pokhara University</a>
        </div>
    </div>

    <!-- Footer -->

    <div class="contact-box">
        <p class="copyright">Copyright @2023 Hamro College.</p>
        <ul>
            <li><i class="fa-solid fa-building" style="color: black;"></i>Hamro College Pvt. Ltd.</li>
            <li><i class="fa-solid fa-location-dot" style="color: black;"></i>Gwarko, Lalitpur</li>
            <li><i class="fa-solid fa-phone" style="color: black;"></i>+977 98XXXXXXXX</li>
            <li><i class="fa-solid fa-envelope" style="color: black;"></i>info@hamrocollege.com</li>
        </ul>
    </div>
    <?php }?>
    
    <script src="script.js"></script>
</body>
</html>