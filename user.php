<?php
    session_start();
    include 'connect.php';

    if(!isset($_SESSION['username'])){
        header('location: homepage.php');
    }

    if(isset($_POST['interested-submit'])){
        $username = $_POST['username'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $collegeId = $_POST['collegeId'];
        $title = $_POST['title'];
        $message = $_POST['message'];
        $status = "Pending";
    
        $sql = "INSERT INTO admission_data (username, phone, email, collegeId, title, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if($stmt->execute([$username, $phone, $email, $collegeId, $title, $message, $status])){
            header("location: user.php");
        }
    }

    if(isset($_POST['submit'])){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $feedback = $_POST['feedback'];

        if(empty($username) || empty($email) || empty($feedback)){
            echo '<script>alert("Please fill all the fields."); window.location.href = "user.php";</script>';
        }else{
            $sql = "INSERT INTO feedback_data (username, email, feedback) VALUES (:username, :email, :feedback)";
            $stmt = $conn->prepare($sql);
            $stmt ->bindParam(':username', $username);
            $stmt ->bindParam(':email', $email);
            $stmt ->bindParam(':feedback', $feedback);
            $stmt ->execute();

            echo '<script>alert("Feedback submitted successfully."); window.location.href = "user.php";</script>';
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
    <title>User Panel</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                <form action="datasearch.php" method="POST" id="search">
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

    <a href="user.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <form action="datasearch.php" method="POST" id="search">
            <input type="text" class="search-box" name="search" id="search-form" placeholder="Search courses, colleges ...">
            <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
        </form>

        <nav class="navbar">
            <ul>
                <li><a href="account.php?userId=<?php echo $_SESSION['userId'];?>"><i class="fa-solid fa-user" style="color: #000000; position: relative; left: 1.5vw"></i></a></li>
                <li><div class="scroll-to-section"><?php echo $_SESSION['username'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>

        <nav class="nav">
            <ul>
                <li><a onclick="showManageTable('courses')" class="nav-section">Courses</a></li>
                <li><a onclick="showManageTable('colleges')" class="nav-section">Colleges</a></li>
                <li><a onclick="showManageTable('disciplines')" class="nav-section">Disciplines</a></li>
                <li><a onclick="showManageTable('universities')" class="nav-section">Universities</a></li>
                <li><a onclick="showManageTable('admission')" class="nav-section">Admissions</a></li>
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="shape-one">

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <!-- Courses -->

    <div class="category-background" id="courses">
        <p class="course-title">COURSES</p>
        <div class="course-grid-container">
        <?php
            $sql = "SELECT * FROM course_data";
            $stmt = $conn->query($sql);

            if($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch()){
                    echo '<a href="coursedetails.php?courseId=' . $row['courseId'] . '" class="course-grid-item">' . $row['title'] . '</a>';
                }
                echo '</div>';
            }else{
                echo "No courses found.";
            }
        ?>
    </div>
    
    <!-- Colleges -->
    
    <div class="college-category-background" id="colleges" style="display: none;">
        <p class="college-title">COLLEGES</p>
        <div class="college-grid-container">
            <?php
                $sql = "SELECT * FROM college_data";
                $stmt = $conn->query($sql);
                
                if($stmt->rowCount() > 0){
                    while ($row = $stmt->fetch()) {
                        echo '<a href="collegedetails.php?collegeId=' . $row['collegeId'] . '" class="college-grid-item">';
                        echo '<img src="./Images/' . $row['logo'] . '">';
                        echo '<p class="college-name">' . $row['name'] . '</p>';
                        echo '<p class="college-address">' . $row['address'] . '</p>';
                        echo '</a>';
                    }
                    echo '</div>';
                }else{
                    echo "No colleges found.";
                }
            ?>
        </div>
    </div>

    <!-- Category -->

    <div class="mixed-category-background" id="disciplines" style="display: none;">
        <div id="affiliation-category">
        <p class="course-affiliation-category-title">DISCIPLINES</p>
        <p class="field-of-study">Field of Studies</p>
        <div class="course-category-grid-container">
            <a href="category.php?field=Computer and Information Technology" class="course-category-grid-item"><i class="fa-solid fa-microchip" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Computer and Information Technology</a>
            <a href="category.php?field=Engineering" class="course-category-grid-item"><i class="fa-solid fa-helmet-safety" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Engineering</a>
            <a href="category.php?field=Management" class="course-category-grid-item"><i class="fa-solid fa-people-group" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Management</a>
            <a href="category.php?field=Science and Technology" class="course-category-grid-item"><i class="fa-solid fa-microscope" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Science and Technology</a>
            <a href="category.php?field=Humanities and Social Sciences" class="course-category-grid-item"><i class="fa-solid fa-people-roof" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Humanities and Social Sciences</a>
            <a href="category.php?field=Agriculture, Forestry and Animal Sciences" class="course-category-grid-item"><i class="fa-solid fa-tree" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Agriculture, Forestry and Animal Sciences</a>
            <a href="category.php?field=Health Professional Education" class="course-category-grid-item"><i class="fa-solid fa-suitcase-medical" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Health Professional Education</a>
            <!-- <a href="category.php?field=Education" class="course-category-grid-item"><i class="fa-solid fa-person-chalkboard" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Education</a> -->
            <a href="category.php?field=Law" class="course-category-grid-item"><i class="fa-solid fa-scale-balanced" style="color: #2b2b2b; font-size: 5rem;"></i><br><br>Law</a>
        </div>
        </div>
    </div>

    <div class="mixed-category-background" id="universities" style="display: none;">
        <div id="affiliation-category">
        <p class="affiliation-category-title">UNIVERSITIES</p>
        <div class="category-grid-container">
            <a href="category.php?affiliation=TU" class="category-grid-item"><img src="Images/tu-logo.png" class="board-logo"><br><br>Tribhuvan University</a>
            <a href="category.php?affiliation=KU" class="category-grid-item"><img src="Images/ku-logo.png" class="board-logo"><br><br>Kathmandu University</a>
            <a href="category.php?affiliation=PU" class="category-grid-item"><img src="Images/pu-logo.png" class="board-logo"><br><br>Pokhara University</a>
            <a href="category.php?affiliation=International" class="category-grid-item"><img src="Images/international-logo.jpg" class="board-logo international"><br><br>International</a>
        </div>
        </div>
    </div>

    <!-- Admission -->

    <div class="admission-category-background" id="admission" style="display: none;">
        <p class="admission-title">FEATURED ADMISSION</p>

        <!-- SLIDESHOW -->

        <a href="https://kathford.edu.np/" target="_blank">
            <img src="Images/kathfordImg.jpg" alt="Kathford" class="image-board"></a>

        <!-- <a href="https://heraldcollege.edu.np/" target="_blank">
            <img src="Images/heraldImg.png" alt="Herald" class="image-board-one"></a> -->

        <div class="slider">
            <a href="#" id="carouselLink" target="_blank">
            <div class="carousel">
                <img id="carouselImage">
            </div>
            </a>
        </div>

        <!-- Admission Form -->

        <p class="admission-form-title">ADMISSION FORM</p>
        <form action="" method="POST" class="interested-form">
        <div class="input-container">
            <input type="text" name="username" id="username" placeholder="Name" required>
            <input type="number" name="phone" id="phone" placeholder="Phone number" required>
            <input type="email" name="email" id="email" placeholder="Email address" required>

            <select name="collegeId" id="name" required>
                <option value="">Apply To</option>
                <?php
                    $stmt = $conn->prepare("SELECT * FROM college_data");
                    $stmt->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach($result as $row){
                        $selected = ($row['name'] == $_POST['name']) ? "selected" : "";
                        echo "<option value='".$row['collegeId']."' ".$selected.">".$row['name']."</option>";
                    }
                ?>
            </select>
                
            <select name="title" id="title" required>
                <option value="">Program Interested In</option>
                <?php
                    $stmt = $conn->prepare("SELECT * FROM course_data");
                    $stmt ->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                    foreach($result as $row){
                        $selected = ($row['title'] == $title) ? "selected" : "";
                        echo "<option value='".$row['abbreviation']."' ".$selected.">".$row['title']."</option>";
                    }
                ?>
            </select>
            <textarea name="message" id="message" cols="30" rows="5" placeholder="Message (Optional)"></textarea>
        </div>
        <input type="submit" class="submit" name="interested-submit" id="interested-submit" value="Submit Application">
        </form>

        <div class="admission-college-grid-container">
            <?php
            $collegeIds = array(15, 5, 7, 10, 3);
            foreach ($collegeIds as $collegeId) {
                $sql = "SELECT * FROM college_data WHERE collegeId = $collegeId";
                $stmt = $conn->query($sql);
        
                if ($stmt->rowCount() > 0) {
                    $row = $stmt->fetch();
                    echo '<a href="collegedetails.php?collegeId=' . $row['collegeId'] . '" class="college-grid-item">';
                    echo '<img src="./Images/' . $row['logo'] . '">';
                    echo '<p class="college-name">' . $row['name'] . '</p>';
                    echo '<p class="college-address">' . $row['address'] . '</p>';
                    echo '</a>';
                } else {
                    echo "College not found.";
                }
            }
            ?>
        </div>
    </div>

    <!-- Feedback -->

    <!-- <div class="feedback" id="feedback">
        <p class="feedback-title">FEEDBACK</p>
        <form action="" method="post" class="feedback-form">
            <div class="input-container">
                <input type="text" name="username" id="name" placeholder="Name">
            </div>

            <div class="input-container">
                <input type="email" name="email" id="email" placeholder="Email address">
            </div>
            
            <textarea class="textarea" name="feedback" id="textarea" cols="60" rows="6" placeholder="Give us some feedback ..."></textarea>
            <input type="submit" class="submit" name="submit" id="submit" value="Submit">
        </form>
    </div> -->

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

    <?php } ?>

    <script src="script.js"></script>
    <script>
        const imageSources = ["Images/softwaricaImg.jpg", "Images/islingtonImg.png"];
        const linkTargets = ["https://softwarica.edu.np/", "https://islington.edu.np/"];

        const carouselImage = document.getElementById("carouselImage");
        const carouselLink = document.getElementById("carouselLink");
        let currentImageIndex = 0;

        function changeImage(){
            carouselImage.src = imageSources[currentImageIndex];
            carouselLink.href = linkTargets[currentImageIndex];
            currentImageIndex++;
            if(currentImageIndex >= imageSources.length){
                currentImageIndex = 0;
            }
        }
        changeImage();
        setInterval(changeImage, 1700);
    </script>

    <script>
        function showAffiliatedColleges(affiliation) {
            window.location.href = "category.php?affiliation=" + affiliation;
        }
        
        function showAffiliatedCourses(field) {
            window.location.href = "category.php?field=" + field;
        }
    </script>
    
    <script>
        var currentManageTable = document.getElementById("courses");

        function showManageTable(tableId){
            var manageTable = document.getElementById(tableId);
            if(currentManageTable !== null && currentManageTable !== manageTable){
                currentManageTable.style.display = "none";
            }

            if(manageTable.style.display === "none"){
                manageTable.style.display = "block";
                currentManageTable = manageTable;
            }
        }

        function hideAllManageTables(){
            var manageTables = document.getElementsByClassName("colleges");
            for(var i = 0; i < manageTables.length; i++){
                manageTables[i].style.display = "none";
            }
            currentManageTable = null;
        }
        currentManageTable.style.display = "block";
    </script>
</body>
</html>