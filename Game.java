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
    public static boolean contains(int[] array, int target) {
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
            if(target == prevColor || target == doublePrevColor || isValidS(board, target) == false){
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
    public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.println("Which gamemode would you like to play?");
    System.out.print("Standard (0) or Close Quarters(1): "); 
    int game = scan.nextInt();
    if(game == 0){
        System.out.println("This is the standard verion of filler. You start at the edges and conquer inwards.");
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
                System.out.println("\n Player 1 Turn");
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
                System.out.println("\n Player 2 Turn");
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
        }
        winner(board); 
    } else if(game == 1){
        System.out.println("In this version of filler, you start in the middle of the board and take over moving outwards.");
        int boardSize = 10;
        int player1Start = boardSize/2-1;
        int player2start = boardSize/2;
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
                floodFill(board, player1Start, player1Start, board[player1Start][player1Start], target);
                System.out.println("\n Player 1 Turn");
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
                floodFill(board, player2start, player2start, board[player2start][player2start], target);
                System.out.println("\n Player 2 Turn");
                System.out.println(printBoard(board));
                doublePrevColor = prevColor;
                prevColor = target;
            }
        }
        winner(board); 
    } else {
        System.out.print("Standard (0) or Close Quarters(1): ");
        game = scan.nextInt();
    }
    }
}