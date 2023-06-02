<?php
    include 'connect.php';

    $getMesg = $_POST['text'];
    $check_data = "SELECT replies FROM chatbot WHERE queries LIKE :getMesg";
    $stmt = $conn->prepare($check_data);
    $stmt ->bindValue(':getMesg', '%' . $getMesg . '%');
    $stmt ->execute();

    if($stmt->rowCount() > 0){
        $fetch_data = $stmt->fetch(PDO::FETCH_ASSOC);
        $reply = $fetch_data['replies'];
        echo $reply;
    }else{
        echo "Sorry, I can't understand you!";
    }
?>