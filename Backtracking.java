import java.util.*;

public class Backtracking {


    public static class WeightFinder {

        public Stack<Integer> path = new Stack<>();
        public List<List<Integer>> solutions = new ArrayList<>();

        public int getNextLowerWeight(int w) {
            int powersOfTen = (int)Math.pow(10,Math.floor(Math.log10(w)));
    
            // div by powersOfTen to reduce the problem to the three cases 0,2,7:
            int w2 = (int)Math.floor(w / powersOfTen);

            if (w2 >= 7) return 7 * powersOfTen;
            if (w2 >= 2) return 2 * powersOfTen;

            // but this is not enough: 11 / 10 = 1 but we could take 7
            // hacky third possibiliy: < 2
            if (powersOfTen >= 10) {
                powersOfTen /= 10;
            }

            w2 = (int)Math.floor(w / powersOfTen);
            if (w2 >= 7) return 7 * powersOfTen;
            if (w2 >= 2) return 2 * powersOfTen;

            // else zero
            else return 0;
        }

        public List<Integer> getListOfAllLowerWeights(int w) {
            List<Integer> r = new ArrayList<>();
            while (w > 0) {
                int w1 = getNextLowerWeight(w);
                if (!r.contains(w1)) {
                    r.add(w1); // check for duplicates
                }
                if (w1 == w) {
                    w1 = getNextLowerWeight(w-1);
                }
                w = w1;
                
            }
        
            if (!r.contains(0)) r.add(0); // if 0 is not in the list, just add it
            return r;
        }


        public List<Integer> calculate(int w) {
            bt(w, null);
            //System.out.println("all solutions" + solutions);
            List<Integer> shortest = getBestSolution();
            return shortest;
        }

        private void bt(int wx, Integer prevSelectedWeight) {
            List<Integer> choices = getListOfAllLowerWeights(wx);

            for (int c : choices) {
                if (prevSelectedWeight == null) {
                    prevSelectedWeight = c;
                }

                if (c > prevSelectedWeight) {
                    continue;
                }

                if (c > 0) {
                    if (wx >= c) {
                        path.push(c);
                        int wx2 = wx - c;
                        bt(wx2, c);
                    }
                }
                else {
                    if (wx == 0) {
                        solutions.add(new ArrayList<Integer>(path));
                        if(!path.isEmpty()) path.pop();
                    }
                    else if (wx > 0) {
                        if(!path.isEmpty()) path.pop();
                    }
                }
            }
        }

        private List<Integer> getBestSolution() {
            long smallest = Integer.MAX_VALUE;
            List<Integer> shortest = new ArrayList<Integer>();
            for (List<Integer> l : solutions) {
                if (l.size() < smallest) {
                    smallest = l.size();
                    shortest = l;
                }
            }

            return shortest;
        }
    }


    public static void main(String[] args) {
        WeightFinder wf = new WeightFinder();
        int w = 141;
        System.out.println("for the number " + w);
        System.out.println("demo 1: next lower weight: " + wf.getNextLowerWeight(w));
        System.out.println("demo 2: all lower weights: " +wf.getListOfAllLowerWeights(w));
        System.out.println("best solution: " + wf.calculate(w));
    }
}