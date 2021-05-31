export default class Process
{

    constructor(func, inpX0, inpX1, inpTolerancia, inpRange, tCalc)
    {
        this._inpX0 = inpX0;
        this._inpX1 = inpX1;
        this._inpTolerancia = Number(inpTolerancia);
        this._inpRange = inpRange;
        this._tCalc = tCalc;


        this._lastMethod = "";
        this._func = func;
        this._method = "-1";
        this._lastX0 = this._inpX0;
        this._lastX1 = this._inpX1;

        this._Xr = 0;
        this._FXr = 0;
        this._FX0 = 0;
        this._FX1 = 0;
        this._Ea = 0;

        this._table = $("#tableBody");
    }

    showResults(I, X0, FX0, X1, FX1, Xr, FXr, Ea)
    {
        $(this._table).append(`<tr><td>${I}</td><td>${X0}</td><td>${FX0}</td><td>${X1}</td><td>${FX1}</td><td>${Xr}</td><td>${FXr}</td><td>${Ea}</td></tr>`)
    }

    getInpX0()
    {
        return this._inpX0;
    }

    getInpX1()
    {
        return this._inpX1;
    }

    getInpTolerancia()
    {
        return this._inpTolerancia;
    }

    getInpRange()
    {
        return this._inpRange;
    }

    getTCalc()
    {
        return this._tCalc;
    }

    getLastMethod()
    {
        return this._lastMethod;
    }


    calcBisection()
    {
        if(this._tCalc == '1')
        {
            let i = 0;

                do
                {
                    this._FX0 = this.evalFunction(this._inpX0);
                    this._FX1 = this.evalFunction(this._inpX1);
                    this._Xr = (this._inpX1 + this._inpX0) / 2;
                    this._FXr = this.evalFunction(this._Xr);
                    this._Ea = Math.abs( (this._Xr - this._inpX1) / this._Xr) * 100;
                    this.showResults(i+1, this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea+"%");
                    this._inpX0 = this._inpX1;
                    this._inpX1 = this._Xr;
                    i++;
                }while(this._inpTolerancia <= this._Ea);
            return;
        }


        for(let i=0; i < this._inpTolerancia; i++)
        {
            this._FX0 = this.evalFunction(this._inpX0);
            this._FX1 = this.evalFunction(this._inpX1);
            this._Xr = (this._inpX1 + this._inpX0) / 2;
            this._FXr = this.evalFunction(this._Xr);
            this._Ea = Math.abs( (this._Xr - this._inpX1) / this._Xr) * 100;
            this.showResults(i+1, this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea+"%");
            this._inpX0 = this._inpX1;
            this._inpX1 = this._Xr;
        }

        return;
    }

    calcFalseRule()
    {
        if(this._tCalc == '1')
        {
            if(this._tCalc1 == 0)
            {

            }else
            {
                
            }
            return;
        }
        return;
    }

    calcSec()
    {
        if(this._tCalc == '1')
        {
            
            return;
        }
        for(let i=0; i < this._inpTolerancia; i++)
        {
            this._FX0 = this.evalFunction(this._inpX0);
            console.log("FX0 " + this._FX0);
            this._FX1 = this.evalFunction(this._inpX1);
            console.log("FX1 " + this._FX1);
            this._Xr =  this._inpX1 -( ( (this._FX1) * (this._inpX0 - this._inpX1) ) / ( (this._FX0) -(this._FX1) ) ); //Manuel says: Alch no me acuerdo de la pinche formula alv
            console.log("Xr " + this._Xr);
            this._FXr = this.evalFunction(this._Xr);
            console.log("FXr " + this._FXr);
            this._Ea = Math.abs( (this._Xr - this._inpX1) / this._Xr) * 100;
            console.log("Ea " + this._Ea);
            this.showResults(i+1, this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea);
            this._inpX0 = this._inpX1;
            this._inpX1 = this._Xr;
        }
        return this._Xr;
    }

    calcNewton()
    {
        if(this._tCalc == '1')
        {
            if(this._tCalc1 == 0)
            {

            }else
            {
                
            }
            return;
        }
        return;
    }


    setFunc(func)
    {
        this._func = func;
    }

    getFunc()
    {
        return this._func;
    }

    setMethod(method)
    {
        this._method = method;
    }

    setTCalc(tCalc)
    {
        this._tCalc = tCalc;
    }

    getMethod()
    {
        return this._method;
    }

    startProcess()
    {
        $("#tableBody tr").remove();

        switch(this._method)
        {
            case '1': this.calcBisection();break;
            case '2': this.calcFalseRule();break;
            case '3': this.calcSec();break;
            case '4': this.calcNewton();break;
            default: return false;break;
        }
    }



    evalFunction(value)
    {
        let f = this._func;
        f = f.replaceAll("x",`(${value})`);
        return Number(math.evaluate(f).toString());
        
    }



    static getProcess()
    {
        let func = $("#inpFuncion").val();
        let inpX0 = Number($("#inpX0").val());
        let inpX1 = Number($("#inpX1").val());
        let inpTolerancia = $("#inpTolerancia").val();
        let inpRange = Number($("#inpRange").val());
        let tCalc = $("#tipoCalc").val();
        
        if(document.querySelector("#form").checkValidity())
        {
            return new Process(func, inpX0, inpX1, inpTolerancia, inpRange, tCalc);
        }

        return false;
    }
}