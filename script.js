function toggleInputs() {
  const type = document.getElementById('calcType').value;
  document.getElementById('input-var').className = (type === 'partial' || type === 'logarithmic') ? 'input-group' : 'input-group hidden';
  document.getElementById('input-order').className = (type === 'higher') ? 'input-group' : 'input-group hidden';
  document.getElementById('input-parametric').className = (type === 'parametric') ? '' : 'hidden';
  document.getElementById('input-f').className = (type === 'parametric') ? 'input-group hidden' : 'input-group';
}

function calculate() {
  const type = document.getElementById('calcType').value;
  const resDiv = document.getElementById('result');
  try {
    let res = "";
    if (type === 'first')
         {
      res = math.derivative(document.getElementById('expr').value, 'x').toString();
    } else if (type === 'higher') 
        {
      let d = document.getElementById('expr').value;
      let n = parseInt(document.getElementById('order').value);
      for (let i = 0; i < n; i++) d = math.derivative(d, 'x');
      res = d.toString();
    } else if (type === 'partial')
         {
      res = math.derivative(document.getElementById('expr').value, document.getElementById('varName').value).toString();
    } else if (type === 'parametric') 
        {
      let dx = math.derivative(document.getElementById('xt').value, document.getElementById('t').value);
      let dy = math.derivative(document.getElementById('yt').value, document.getElementById('t').value);
      res = `(${dy.toString()}) / (${dx.toString()})`;
    } else if (type === 'logarithmic') 
        {
      let f = document.getElementById('expr').value;
      let v = document.getElementById('varName').value;
      res = `(${math.derivative(f, v).toString()}) / (${f})`;
    }
    resDiv.innerHTML = "Result: " + res;
  } catch (e) {
    resDiv.innerHTML = "Error: Invalid input.";
  }
}

// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();