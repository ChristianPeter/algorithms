

function getNextNLowerWeight(w) {
    // 0,2,7 20,70 200,700 ...
    // 80?
    var powersOfTen = Math.pow(10,Math.floor(Math.log10(w)));
    var w2 = Math.floor(w / powersOfTen);
    if (w2 >= 7) return 7 * powersOfTen;
    if (w2 >= 2) return 2 * powersOfTen;

    // hacky third possibiliy: < 2
    if (powersOfTen >= 10) {
        powersOfTen /= 10;
    }

    w2 = Math.floor(w / powersOfTen);
    if (w2 >= 7) return 7 * powersOfTen;
    if (w2 >= 2) return 2 * powersOfTen;

    else return 0;
}

function getListOfAllLowerWeights2(w) {
    var r = [];
    while (w > 0) {
        var w1 = getNextNLowerWeight(w);
        if (r.indexOf(w1) <0) {
            r.push(w1);
        }
        if (w1 == w) {
            w1 = getNextNLowerWeight(w-1);
        }
        w = w1;
        
    }

    if (r.indexOf(0) <0) r.push(0);
    return r;
}



(function(w){
    var sol = [];
    var path = [];

    console.log('list of possible weights for',w , getListOfAllLowerWeights2(w));

    function done(){
        console.log('---> done', sol);
    }

    function bt(wx, selected){
        var choices = getListOfAllLowerWeights2(wx);
        //console.log('bt',wx,choices,path,sol);
        for (var c in choices) {
            var wc = choices[c];
            if (selected === undefined) {
                selected = wc;
            }

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