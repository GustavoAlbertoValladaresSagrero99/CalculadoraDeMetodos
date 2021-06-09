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
        this._lastXr = [];

        this._Raiz = 0;

        this._Xr = 0;
        this._FXr = 0;
        this._FX0 = 0;
        this._FX1 = 0;
        this._Ea = 100;

        this._table = $("#tableBody");
    }

    showResults(I, X0, FX0, X1, FX1, Xr, FXr, Ea)
    {
        $(this._table).append(`<tr><td>${I}</td><td>${X0}</td><td>${FX0}</td><td>${X1}</td><td>${FX1}</td><td>${Xr}</td><td>${FXr}</td><td>${Ea}</td></tr>`)
    }

    _roundFixed(num, dec)
    {
        let exp = Math.pow(10, dec || 2); // 2 decimales por defecto
        return parseInt(num * exp, 10) / exp;
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




    //Esta método de clase permite calcular la aprox de una raiz utilizando
    //el metodo de bisección
    calcBisection()
    {
        if(!((this._inpX0 * this._inpX1) < 0))
        {
            if(this._tCalc == '1')
            {
                let i = 0;
    
                do
                {
                    //Paso 1: Obtener F(x) de XL y Xu
                    this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
                    console.log("FX0 = " + this._FX0);
                    this._FX1 = this._roundFixed(this.evalFunction(this._inpX1), this._inpRange);
                    console.log("FX1 = " + this._FX1);
                    //Paso 2: Obtener el valor de Xr
                    this._Xr = this._roundFixed((this._inpX1 + this._inpX0) / 2, this._inpRange);
                    console.log("Xr = " + this._Xr);
                    //Paso 3.5: Guardar el valor de Xr
                    this._lastXr.push(this._Xr);
                    //Paso 3: Obtener F(xr)
                    this._FXr = this._roundFixed(this.evalFunction(this._Xr), this._inpRange);
                    //Paso 4: Obtener el error
                    if(this._lastXr.length > 1)
                    {
                        console.log("Xr: " + this._Xr);
                        console.log("LastXr: " + this._lastXr[i-1]);
                        this._Ea = this._roundFixed(Math.abs(((this._Xr - this._lastXr[i-1])/this._Xr)*100), this._inpRange);
                    }else
                    {
                        this._Ea = "---";
                    }
                    //Paso 4.5: Imprimir resultados
                    this.showResults(i+1,this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea +"%");
                    //Paso 5: Hacer la comparación
                    if((this._FX0 * this._FXr) < 0) this._inpX1 = this._Xr;
                    else if((this._FX0 * this._FXr) > 0) this._inpX0 = this._Xr;
                    else
                    {
                        this._Raiz = this._Xr;
                        break;
                    }
                    if(typeof this._Ea == "number")
                    {
                        console.log("Entro!");
                        if(this._Ea <= this._inpTolerancia) break;
                    }
                    i++;
                }while(i < 10);
            }else
            {
                for(let i=0; i < this._inpTolerancia; i++)
                {
                    //Paso 1: Obtener F(x) de XL y Xu
                    this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
                    console.log("FX0 = " + this._FX0);
                    this._FX1 = this._roundFixed(this.evalFunction(this._inpX1), this._inpRange);
                    console.log("FX1 = " + this._FX1);
                    //Paso 2: Obtener el valor de Xr
                    this._Xr = this._roundFixed((this._inpX1 + this._inpX0) / 2, this._inpRange);
                    console.log("Xr = " + this._Xr);
                    //Paso 3.5: Guardar el valor de Xr
                    this._lastXr.push(this._Xr);
                    //Paso 3: Obtener F(xr)
                    this._FXr = this._roundFixed(this.evalFunction(this._Xr), this._inpRange);
                    //Paso 4: Obtener el error
                    if(this._lastXr.length > 1)
                    {
                        console.log("Xr: " + this._Xr);
                        console.log("LastXr: " + this._lastXr[i-1]);
                        this._Ea = this._roundFixed(Math.abs(((this._Xr - this._lastXr[i-1])/this._Xr)*100), this._inpRange) + "%";
                    }else
                    {
                        this._Ea = "---";
                    }
                    //Paso 4.5: Imprimir resultados
                    this.showResults(i+1,this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea);
                    //Paso 5: Hacer la comparación
                    if((this._FX0 * this._FXr) < 0) this._inpX1 = this._Xr;
                    else if((this._FX0 * this._FXr) > 0) this._inpX0 = this._Xr;
                    else 
                    {
                        this._Raiz = this._Xr;
                        break;
                    }
                }
            }
    
    

    
        }else
        {
            Swal.fire(
                'ERROR',
                `No se puede sacar raíz con estos intervalos!`,
                'error'
              );
            return;
        }
    }

    //Esta método de clase permite calcular la aprox de una raiz utilizando
    //el metodo de falsa posición
    calcFakeRule()
    {
        if(!((this._inpX0 * this._inpX1) < 0))
        {
            let i =0;
            if(this._tCalc == 1)
            {
                do
                {
                    //Paso 1: Obtener F(x) de XL y Xu
                    this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
                    console.log("FX0 = " + this._FX0);
                    this._FX1 = this._roundFixed(this.evalFunction(this._inpX1), this._inpRange);
                    console.log("FX1 = " + this._FX1);
                    //Paso 2: Obtener el valor de Xr
                    this._Xr = this._roundFixed((this._inpX1 - ((this._FX1 * (this._inpX0 - this._inpX1)) / (this._FX0 - this._FX1))), this._inpRange);
                    console.log("Xr = " + this._Xr);
                    //Paso 3.5: Guardar el valor de Xr
                    this._lastXr.push(this._Xr);
                    //Paso 3: Obtener F(xr)
                    this._FXr = this._roundFixed(this.evalFunction(this._Xr), this._inpRange);
                    //Paso 4: Obtener el error
                    if(this._lastXr.length > 1)
                    {
                        console.log("Xr: " + this._Xr);
                        console.log("LastXr: " + this._lastXr[i-1]);
                        this._Ea = this._roundFixed(Math.abs(((this._Xr - this._lastXr[i-1])/this._Xr)*100), this._inpRange);
                    }else
                    {
                        this._Ea = "---";
                    }
                    //Paso 4.5: Imprimir resultados
                    this.showResults(i+1,this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea +"%");
                    //Paso 5: Hacer la comparación
                    if((this._FX0 * this._FXr) < 0) this._inpX1 = this._Xr;
                    else if((this._FX0 * this._FXr) > 0) this._inpX0 = this._Xr;
                    else
                    {
                        this._Raiz = this._Xr;
                        break;
                    }
                    if(typeof this._Ea == "number")
                    {
                        console.log("Entro!");
                        if(this._inpTolerancia >= this._Ea) break;
                    }
                    i++;
                }while(i < 10);
            }else
            {
                do
            {
                //Paso 1: Obtener F(x) de XL y Xu
                this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
                console.log("FX0 = " + this._FX0);
                this._FX1 = this._roundFixed(this.evalFunction(this._inpX1), this._inpRange);
                console.log("FX1 = " + this._FX1);
                //Paso 2: Obtener el valor de Xr
                this._Xr = this._roundFixed((this._inpX1 - ((this._FX1 * (this._inpX0 - this._inpX1)) / (this._FX0 - this._FX1))), this._inpRange);
                console.log("Xr = " + this._Xr);
                //Paso 3.5: Guardar el valor de Xr
                this._lastXr.push(this._Xr);
                //Paso 3: Obtener F(xr)
                this._FXr = this._roundFixed(this.evalFunction(this._Xr), this._inpRange);
                //Paso 4: Obtener el error
                if(this._lastXr.length > 1)
                {
                    console.log("Xr: " + this._Xr);
                    console.log("LastXr: " + this._lastXr[i-1]);
                    this._Ea = this._roundFixed(Math.abs(((this._Xr - this._lastXr[i-1])/this._Xr)*100), this._inpRange) + "%";
                }else
                {
                    this._Ea = "---";
                }
                //Paso 4.5: Imprimir resultados
                this.showResults(i+1,this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea);
                //Paso 5: Hacer la comparación
                if((this._FX0 * this._FXr) < 0) this._inpX1 = this._Xr;
                else if((this._FX0 * this._FXr) > 0) this._inpX0 = this._Xr;
                else 
                {
                    this._Raiz = this._Xr;
                    break;
                }
                i++;
            }while(i < this._inpTolerancia);
            }   
        }else
        {
            Swal.fire(
                'ERROR',
                `No se puede sacar raíz con estos intervalos!`,
                'error'
              );
            return;
        }
    }


    //Esta método de clase permite calcular la aprox de una raiz utilizando
    //el metodo de secante
    calcSec()
    {
        if(this._tCalc == '1')
        {
            let i = 0;
            do
            {
                this._FX0 = this.evalFunction(this._inpX0);
                console.log("FX0 " + this._FX0);
                this._FX1 = this.evalFunction(this._inpX1);
                console.log("FX1 " + this._FX1);
                this._Xr =  this._inpX1 -( ( (this._FX1) * (this._inpX0 - this._inpX1) ) / ( (this._FX0) -(this._FX1) ) );
                console.log("Xr " + this._Xr);
                this._FXr = this.evalFunction(this._Xr);
                console.log("FXr " + this._FXr);
                this._Ea = Math.abs( (this._Xr - this._inpX1) / this._Xr) * 100;
                console.log("Ea " + this._Ea);
                this.showResults(i+1, this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea);
                this._inpX0 = this._inpX1;
                this._inpX1 = this._Xr;
                i++;
            }while(this._inpTolerancia <= this._Ea);


            return;
        }
        for(let i=0; i < this._inpTolerancia; i++)
        {
            this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
            console.log("FX0 " + this._FX0);
            this._FX1 = this._roundFixed(this.evalFunction(this._inpX1), this._inpRange);
            console.log("FX1 " + this._FX1);
            this._Xr =  this._roundFixed((this._inpX1 -( ( (this._FX1) * (this._inpX0 - this._inpX1) ) / ( (this._FX0) -(this._FX1) ) )), this._inpRange);
            console.log("Xr " + this._Xr);
            this._FXr = this._roundFixed(this.evalFunction(this._Xr), this._inpRange);
            console.log("FXr " + this._FXr);
            this._Ea = this._roundFixed(Math.abs( (this._Xr - this._inpX1) / this._Xr) * 100, this._inpRange);
            console.log("Ea " + this._Ea);
            this.showResults(i+1, this._inpX0, this._FX0, this._inpX1, this._FX1, this._Xr, this._FXr, this._Ea+"%");
            this._inpX0 = this._inpX1;
            this._inpX1 = this._Xr;
        }
        return this._Xr;
    }

    //Esta método de clase permite calcular la aprox de una raiz utilizando
    //el metodo de Newton
    calcNewton()
    {
        let deriv = math.derivative(this._func, "x");
        let i = 0;
        let calcDeriv = 0;
        do
        {
            this._FX0 = this._roundFixed(this.evalFunction(this._inpX0), this._inpRange);
            calcDeriv = this._roundFixed(deriv.evaluate({x:this._inpX0}), this._inpRange);
            console.log("Derivada: " + calcDeriv);
            this._Xr = this._roundFixed((this._inpX0 - ( this._FX0 / calcDeriv)), this._inpRange);
            this._lastXr.push(this._Xr);
            if(this._lastXr.length > 1)
            {
                this._Ea = this._roundFixed(Math.abs((this._Xr - this._lastXr[i-1])/this._Xr) * 100, this._inpRange);
            }else
            {
                this._Ea = "---";
            }
            this.showResults(i+1,this._inpX0, this._FX0, "-","-", this._Xr, "-", this._Ea+"%");
            if(this._tCalc == 1)
            {
                if(typeof this._Ea == "number")
                {
                    if(this._Ea <= this._inpTolerancia) break;
                }
            }else
            {
                if(i >= this._inpTolerancia)
                {
                    break;
                }
            }
            this._inpX0 = this._Xr;
            i++;
        }while(1);




        //xi+1 = xi - (fxi / fxd)

        // fx=x^3-x +1, x0=-1 fxd=3x^2-1
        // xi+1=xi-x3-x+1/3x2-1 
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
            case '2': this.calcFakeRule();break;
            case '3': this.calcSec();break;
            case '4': this.calcNewton();break;
            default: return false;break;
        }
    }


    //Este metodo permite evaluar una funcion y regresa el resultado numerico
    evalFunction(value)
    {
        let f = this._func;
        f = f.replaceAll("x",`(${value})`);
        return Number(math.evaluate(f).toString());
        
    }


    //Estemetodo permite obtener los valores del DOM y crear un objeto Process
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