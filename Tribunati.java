import java.util.*;

public class Tribunati {

    static int counter = 0;

    static int tribDynNoBrain(int n, int[] brain) {
        counter++;
        // 0, 1, 1, 2, 4, 7, 13, 24
        if (n == 0) return 0;
        if (n == 1) {
            //fillBrain(1, brain);
            return 1;
        }
        if (n == 2) {
            //fillBrain(1, brain);
            return 1;
        }

        else return tribDyn(n-1, brain) 
        + tribDyn(n-2, brain)
        + tribDyn(n-3, brain);


    }

    static int tribDyn(int n, int[] brain) {
        counter++;
        // 0, 1, 1, 2, 4, 7, 13, 24
        if (n == 0) return 0;
        if (n == 1) {
            //fillBrain(1, brain);
            return 1;
        }
        if (n == 2) {
            //fillBrain(1, brain);
            return 1;
        }

        else {

            int t1 = brain[n-1] > -1 ? brain[n-1] : tribDyn(n-1, brain);
            int t2 = brain[n-2] > -1 ? brain[n-2] : tribDyn(n-2, brain);
            int t3 = brain[n-3] > -1 ? brain[n-3] : tribDyn(n-3, brain);

            int sum = t1 + t2 + t3;
            brain[n] = sum;
            return sum;
        }
    }

    
    public static void main(String[] args) {
        System.out.println("tribunati calculati");
        int n = 51;
        int[] brain = new int[100];

        System.out.println("#### no brain - just recursive");
        for (int i = 0; i < brain.length; i++) brain[i] = -1; //init
        counter = 0;
        System.out.println(tribDynNoBrain(n, brain));
        System.out.println("number of calls: " + counter);

        System.out.println("#### with brain to store intermediate results");
        for (int i = 0; i < brain.length; i++) brain[i] = -1; //init
        counter = 0;
        System.out.println(tribDyn(n, brain));
        System.out.println("number of calls: " + counter);

    }
}