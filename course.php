<?php
    session_start();
    include 'connect.php';

    if(!isset($_SESSION['institutionemail'])){
        header('location: homepage.php');
    }

    // Add Courses

    if(isset($_POST['submit'])){
        $affiliation = $_POST['affiliation'];
        $field = $_POST['field'];
        $title = $_POST['title'];
        $abbreviation = $_POST['abbreviation'];
        $content = nl2br($_POST['content']);
        $eligibility = nl2br($_POST['eligibility']);
        $job = nl2br($_POST['job']);

        $sql = "SELECT * FROM course_data WHERE affiliation = ? && title = ?";
        $stmt = $conn->prepare($sql);
        $stmt ->execute([$affiliation, $title]);
        $result = $stmt->fetch();

        if($result){
            echo '<script> alert("Course already exists in database.") </script>';
        }else{
            if(empty($_POST['affiliation']) || empty($_POST['field']) || empty($_POST['title']) || empty($_POST['abbreviation']) || empty($_POST['content']) || empty($_POST['eligibility']) || empty($_POST['job'])){
                echo '<script> alert("Please fill all the fields."); window.location.href = "course.php"; </script>';
            }else{
                $sql = "INSERT INTO course_data (affiliation, field, title, abbreviation, content, eligibility, job) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt ->execute([$affiliation, $field, $title, $abbreviation, $content, $eligibility, $job]);
                echo '<script> alert("Course added successfully."); window.location.href = "course.php"; </script>';
            }
        }
    }

    // Update Courses

    if(isset($_POST['courseId'])){
        $courseId = $_POST['courseId'];
    }

    $stmt = $conn->prepare("SELECT * FROM course_data WHERE courseId = :courseId");
    $stmt ->bindParam(":courseId",$courseId);
    $stmt ->execute();
    $value = $stmt->fetch(PDO::FETCH_ASSOC);

    $courseId = isset($value['courseId']) ? $value['courseId'] : '';
    $title = isset($value['title']) ? $value['title'] : '';
    $abbreviation = isset($value['abbreviation']) ? $value['abbreviation'] : '';
    $content = isset($value['content']) ? $value['content'] : '';
    $eligibility = isset($value['eligibility']) ? $value['eligibility'] : '';
    $job = isset($value['job']) ? $value['job'] : '';

    if(isset($_POST['update-submit'])){
        $courseId = $_POST['courseId'];
        $title = $_POST['title'];
        $abbreviation = $_POST['abbreviation'];
        $content = nl2br($_POST['content']);
        $eligibility = nl2br($_POST['eligibility']);
        $job = nl2br($_POST['job']);

        if(empty($_POST['courseId']) || empty($_POST['title']) || empty($_POST['abbreviation']) || empty($_POST['content']) || empty($_POST['eligibility']) || empty($_POST['job'])){
            echo '<script> alert("Please fill all the fields."); window.location.href = "course.php"; </script>';
        }else{
            $stmt = $conn->prepare("UPDATE course_data SET courseId = :courseId, title = :title, abbreviation = :abbreviation, content = :content, eligibility = :eligibility, job = :job WHERE courseId = :courseId");
            $stmt ->bindParam(":courseId", $courseId);
            $stmt ->bindParam(":title", $title);
            $stmt ->bindParam(":abbreviation", $abbreviation);
            $stmt ->bindParam(":content", $content);
            $stmt ->bindParam(":eligibility", $eligibility);
            $stmt ->bindParam(":job", $job);
            $stmt ->execute();
    
            echo '<script> alert("Course updated successfully."); window.location.href = "course.php"; </script>';
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Course</title>
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
                <li><a href="institution.php" class="nav-section">Dashboard</a></li>
                <li><a href="course.php" class="nav-section active">Course</a></li>
                <li><a href="college.php?institutionId=<?php echo $_SESSION['institutionId']?>" class="nav-section">College</a></li>
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="admin-shape-one">

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <i class="fa-solid fa-arrow-right" id="toggleButton" style="color: #000000;"></i>

    <!-- Add Courses -->

    <div class="course-details" id="course-details">
        <form action="" method="POST" class="course-form">
            <p class="add-course-title">ADD COURSES</p>
            <div class="input-container">

                <select class="affiliation" name="affiliation">
                    <option value="">Affiliation</option>
                    <option value="TU">TU</option>
                    <option value="KU">KU</option>
                    <option value="PU">PU</option>
                    <option value="International">International</option>
                </select>

                <select class="field" name="field">
                    <option value="">Field of Study</option>
                    <option value="Computer and Information Technology">Computer and Information Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Science and Technology">Science and Technology</option>
                    <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
                    <option value="Agriculture, Forestry and Animal Sciences">Agriculture, Forestry and Animal Sciences</option>
                    <option value="Economics">Economics</option>
                    <option value="Health Professional Education">Health Professional Education</option>
                    <option value="Law">Law</option>
                </select>

                <input type="text" name="title" id="course-title" placeholder="Course Title">
                <input type="text" name="abbreviation" id="course-abbreviation" placeholder="Abbreviation">
                <textarea name="content" id="content" cols="60" rows="7" placeholder="Course Details"></textarea>
                <textarea name="eligibility" id="eligibility" cols="60" rows="7" placeholder="Course Eligibility"></textarea>
                <textarea name="job" id="job" cols="60" rows="7" placeholder="Job Prospects"></textarea>
            </div>
            <input type="submit" class="submit" name="submit" id="submit" value="Add">
        </form>
    </div>

    <!-- Manage Courses -->

    <div class="course-details" id="course-update">
        <form action="" method="POST" class="manage-course-form">
            <p class="update-course-title">UPDATE COURSES</p>
            <div class="input-container">
            <select class="id" name="courseId" id="courseId" onchange="this.form.submit()">
                <option value="">Course ID</option>
                <?php
                    $stmt = $conn->prepare("SELECT courseId FROM course_data");
                    $stmt ->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                    foreach ($result as $row) {
                        $selected = ($row['courseId'] == $courseId) ? "selected" : "";
                        echo "<option value='".$row['courseId']."' ".$selected.">".$row['courseId']."</option>";
                    }
                ?>
            </select>

            <input type="text" class="abbreviation" name="abbreviation" id="abbreviation" placeholder="Abbreviation" value="<?php echo $abbreviation ?>">
            <input type="text" class="title" name="title" id="title" placeholder="Course Title" value="<?php echo $title ?>">
            <textarea name="content" id="content" cols="60" rows="7" placeholder="Course Details"><?php echo $content ?></textarea>
            <textarea name="eligibility" id="eligibility" cols="60" rows="7" placeholder="Course Eligibility"><?php echo $eligibility ?></textarea>
            <textarea name="job" id="job" cols="60" rows="7" placeholder="Job Prospects"><?php echo $job ?></textarea>
            </div>
            <input type="submit" class="submit" name="update-submit" id="update-submit" value="Update">
        </form>
    </div>

    <script src="script.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(){
            var courseDetailsDiv = document.getElementById("course-details");
            var courseUpdateDiv = document.getElementById("course-update");
            var toggleButton = document.getElementById("toggleButton");
            
            courseDetailsDiv.style.display = "none";
            toggleButton.addEventListener("click", function(){
                if(courseUpdateDiv.style.display === "none"){
                    courseUpdateDiv.style.display = "block";
                    courseDetailsDiv.style.display = "none";
                }else{
                    courseUpdateDiv.style.display = "none";
                    courseDetailsDiv.style.display = "block";
                }
            });
        });
    </script>
</body>
</html>