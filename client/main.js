document.getElementById('calculator-form').addEventListener('submit', async (e) => {
   e.preventDefault();

   const num1 = document.getElementById('num1').value;
   const num2 = document.getElementById('num2').value;
   const operation = document.getElementById('operation').value;

   try {
      const response = await fetch('/calculate', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ num1, num2, operation }),
      });

      const data = await response.json();
      const resultDiv = document.createElement('div');
      resultDiv.textContent = `Result: ${data.result}`;

      
      const resultsContainer = document.getElementById('result');
      resultsContainer.appendChild(resultDiv);
   } catch (error) {
      console.error('Помилка при відправці запиту:', error);
   }
});
