<?php

session_start();
session_destroy();

header("Location: ../login-aluno-empresa.php");
exit;