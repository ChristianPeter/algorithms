

/*
for a given number w find the next lower (or equal) weight
*/
function getNextNLowerWeight(w) {
    // 0,2,7 20,70 200,700 ...
    // there are 3 cases : 0, 2 and 7
    // and in the continuation 2 * 10^n, 7 * 10^n

    // find the power of then for the given number
    // 55 -> 10
    // 123 -> 100
    // 3442 -> 1000

    var powersOfTen = Math.pow(10,Math.floor(Math.log10(w)));
    
    // div by powersOfTen to reduce the problem to the three cases 0,2,7:
    var w2 = Math.floor(w / powersOfTen);

    if (w2 >= 7) return 7 * powersOfTen;
    if (w2 >= 2) return 2 * powersOfTen;

    // but this is not enough: 11 / 10 = 1 but we could take 7
    // hacky third possibiliy: < 2
    if (powersOfTen >= 10) {
        powersOfTen /= 10;
    }

    w2 = Math.floor(w / powersOfTen);
    if (w2 >= 7) return 7 * powersOfTen;
    if (w2 >= 2) return 2 * powersOfTen;

    // else zero
    else return 0;
}

/*
returns a list of all weights below a given number in descending order:
80 -> 70,20,7,2,0
*/
function getListOfAllLowerWeights2(w) {
    var r = [];
    while (w > 0) {
        var w1 = getNextNLowerWeight(w);
        if (r.indexOf(w1) <0) {
            r.push(w1); // check for duplicates
        }
        if (w1 == w) {
            w1 = getNextNLowerWeight(w-1);
        }
        w = w1;
        
    }

    if (r.indexOf(0) <0) r.push(0); // if 0 is not in the list, just add it
    return r;
}



(function(w){
    var sol = [];
    var path = [];

    console.log('list of possible weights for',w , getListOfAllLowerWeights2(w));

    /*
    just for output
    */
    function done(){
        console.log('---> done', sol);
    }

    /*
    backtracking starting with a given number (wx) selected is undefined in the beginning.
    it checks the list of all possible weights for wx
    it iterates over the weights 
    if the weight is not 0 and number is > the weight: add to the current 'path' of weights and call the backtracking again
    if the weight is 0 and the number is 0: we found a solution
    if the weight is 0 but the number is > 0: we are in trouble. no possible solution
    #
    the 'selected' parameter will provide the last selected weight to ensure the next chosen weight is smaller than the last
    */
    function bt(wx, selected){
        var choices = getListOfAllLowerWeights2(wx);
        //console.log('bt',wx,choices,path,sol);
        for (var c in choices) {
            var wc = choices[c];
            if (selected === undefined) {
                selected = wc;
            }

            // checks if the next weight is smaller or equals the last selected weight
            if (wc > selected) {
                continue;
            }
            //console.log('trying', wc, wx);
            if (wc == 0) {
                if (wx == 0) {
                    // found solution
                    //console.log('found solution', path);
                    sol.push({path: JSON.stringify(path), len : path.length});
                    path.pop();
                    //break;
                }
                if (wx > 0) {
                    // not a solution -> backtrack
                    path.pop();
                    //console.log('not a solution', path);
                    //break;
                }
            }
            else if (wx >= wc) {
                // found smaller one. go for it
                path.push(wc);
                var wx2 = wx-wc;
                //console.log('found matching one', wc, wx2,path);
                bt(wx-wc, wc);
            }
        }

        
    }


    bt(w);
    done();

})(80);