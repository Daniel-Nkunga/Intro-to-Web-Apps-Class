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
            System.out.println("Player 1 Wins!");
        } else if(palyer2Count > palyer1Count){
            System.out.println("Player 1 Wins!");
        } else {
            System.out.println("It's a tie");
        }
    }
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Board size: ");
        int boardSize = scan.nextInt();
        int[][] board = new int[boardSize][boardSize];
        randomize(board);
        System.out.println(printBoard(board));
        while(isGameOver(board) == false){
            System.out.print("Capture: ");
            int target = scan.nextInt();
            floodFill(board, 0, 0, board[0][0], target);
            System.out.println(printBoard(board));
            floodFill(board, board.length-1, board.length-1, board[0][0], target);
            System.out.println(printBoard(board));
        }
        winner(board); 
    }
}
