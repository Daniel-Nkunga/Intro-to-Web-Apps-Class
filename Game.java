import java.util.*;
public class Game {
    public static String printBoard(int[][] board) {
        StringBuilder boardString = new StringBuilder();
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                boardString.append(board[i][j]).append(" ");
            }
            boardString.append("\n");
        }
        return boardString.toString();
    }
    public static void randomize(int[][] board) {
        Random random = new Random();
        int rows = board.length;
        int columns = board[0].length;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                int randomNumber;
                do {
                    randomNumber = random.nextInt(6) + 1;
                } while ((i > 0 && board[i - 1][j] == randomNumber) || (j > 0 && board[i][j - 1] == randomNumber) || (i > 0 && j > 0 && board[i - 1][j - 1] == randomNumber));

                board[i][j] = randomNumber;
            }
        }
        if(board[0][0] == board[board.length-1][board.length-1]){
            if(board[0][0] < 6){
                board[0][0]++;
            } else {
                board[0][0]--;
            }
        }
    }
    public static void floodFill(int[][] board, int row, int col, int targetColor, int replacementColor) {
        int rows = board.length;
        int columns = board[0].length;
        if (row < 0 || row >= rows || col < 0 || col >= columns) {
            return;
        }
        if (board[row][col] != targetColor) {
            return;
        }
        board[row][col] = replacementColor;
        floodFill(board, row - 1, col, targetColor, replacementColor);
        floodFill(board, row + 1, col, targetColor, replacementColor);
        floodFill(board, row, col - 1, targetColor, replacementColor);
        floodFill(board, row, col + 1, targetColor, replacementColor);
    }
    public static boolean contains(int[] array, int target) { //Is this not in Java?
        for (int element : array) {
            if (element == target) {
                return true;
            }
        }
        return false;
    }
    public static boolean isGameOver(int[][] board) {
        List<Integer> colorList = new ArrayList<>();
        colorList.add(0);
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (!colorList.contains(board[i][j])) {
                    colorList.add(board[i][j]);
                }
            }
        }
        if(colorList.size()>3){
            return false;
        } else {
            return true;
        }
    }
    public static void winner(int[][] board) {
        int player1 = board[0][0];
        int palyer1Count = 0;
        int player2 = board[board.length-1][board.length-1];
        int palyer2Count = 0;
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if(board[i][j] == player1) palyer1Count++;
                if(board[i][j] == player2) palyer2Count++;
            }
        }
        if(palyer1Count > palyer2Count){
            System.out.printf("Player 1: %d\n",palyer1Count);
            System.out.printf("Player 2: %d\n",palyer2Count);
            System.out.printf("Player 1 Wins!");
        } else if(palyer2Count > palyer1Count){
            System.out.printf("Player 1: %d\n",palyer1Count);
            System.out.printf("Player 2: %d\n",palyer2Count);
            System.out.printf("Player 2 Wins!");
            System.out.println("Player 2 Wins!");
        } else {
            System.out.println("It's a tie");
        }
    }
    public static boolean isValidS(int[][] board, int target){
        if(target < 1){
            return false;
        } else if(target > 6){
            return false;
        } else if(target == board[0][0]){
            return false;
        } else if(target == board[board.length-1][board.length-1]){
            return false;
        } else {
            return true;
        }
    }
    public static void standard(){
        System.out.println("This is the standard verion of filler. You start at the edges and conquer inwards.");
        Scanner scan = new Scanner(System.in);
        int boardSize = 10;
        int[][] board = new int[boardSize][boardSize];
        randomize(board);
        int prevColor = board[0][0];
        int doublePrevColor = board[board.length-1][board.length-1];
        System.out.println(printBoard(board));
        while(isGameOver(board) == false){
            System.out.print("Capture: ");
            int target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidS(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, 0, 0, board[0][0], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
            System.out.print("Capture: ");
            target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidS(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, board.length-1, board.length-1, board[board.length-1][board.length-1], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
        }
        winner(board); 
    }
    public static boolean isValidC(int[][] board, int target){
        if(target < 1){
            return false;
        } else if(target > 6){
            return false;
        } else if(target == board[4][4]){
            return false;
        } else if(target == board[5][5]){
            return false;
        } else {
            return true;
        }
    }
    public static void closeQuarters(){
        System.out.println("In this version of filler, you start in the middle of the board and take over moving outwards.");
        Scanner scan = new Scanner(System.in);
        int boardSize = 10;
        int[][] board = new int[boardSize][boardSize];
        randomize(board);
        int prevColor = board[4][4];
        int doublePrevColor = board[5][5];
        System.out.println(printBoard(board));
        while(isGameOver(board) == false){
            System.out.print("Capture: ");
            int target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidC(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, 4, 4, board[4][4], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
            System.out.print("Capture: ");
            target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidC(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, 5, 5, board[5][5], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
        }
        winner(board); 
    }
    public static boolean isValidCq(int[][] board, int target){
        if(target < 1){
            return false;
        } else if(target > 6){
            return false;
        } else if(target == board[4][4]){
            return false;
        } else if(target == board[5][5]){
            return false;
        } else {
            return true;
        }
    }
    public static void conquest(){
        System.out.println("In this version of filler, you can flood fill from multiple points on the board. You choose three places to start on the board in addtion to your corresponding starting corner at the beginning of the game.");
        Scanner scan = new Scanner(System.in);
        int boardSize = 20;
        int[][] board = new int[boardSize][boardSize];
        randomize(board);
        int prevColor = board[0][0];
        int doublePrevColor = board[board.length-1][board.length-1];
        boolean isValidStart = false;
        while(isValidStart == false){
            System.out.print("New start x componenet: ");
            scan.nextInt();
            System.out.print("New start y componenet: ");
            scan.nextInt();
        }
        System.out.println(printBoard(board));
        while(isGameOver(board) == false){
            System.out.print("Capture: ");
            int target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidCq(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, 4, 4, board[4][4], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
            System.out.print("Capture: ");
            target = scan.nextInt();
            if(target == prevColor || target == doublePrevColor || isValidCq(board, target) == false){
                System.out.print("Capture: ");
                target = scan.nextInt();
            } else {
                floodFill(board, 5, 5, board[5][5], target);
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
        }
        winner(board); 
    }
    public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.println("Which gamemode would you like to play?");
    System.out.print("Standard (0), Close Quarters(1), Conquest(2): ");
    int game = scan.nextInt();
    if(game == 0){
        standard();
    } else if(game == 1){
        closeQuarters();
    } else if(game ==2){
        conquest();
    } else {
        System.out.print("Standard (0), Close Quarters(1), Conquest(2): ");
        game = scan.nextInt();
    }
    }
}