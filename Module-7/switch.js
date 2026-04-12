let useType = "admin";

switch (useType) {
    case "admin":
        console.log("Welcome, Admin!");
        break;
    case "editor":
        console.log("Welcome, Editor!");
        break;
    case "viewer":
        console.log("Welcome, Viewer!");
        break;
    default:
        console.log("Invalid user type!");
}