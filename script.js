document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loadCalcForm');
  const results = document.getElementById('calculation-results');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const efficiency = parseFloat(form.efficiency.value);
    const cosPhi = parseFloat(form['power-factor'].value);
    const voltage = parseFloat(form.voltage.value);
    const quantity = parseInt(form.quantity.value, 10);
    const nominalPower = parseFloat(form['nominal-power'].value);
    const utilization = parseFloat(form.utilization.value);
    const reactiveFactor = parseFloat(form['reactive-factor'].value);

    if (
      efficiency <= 0 || efficiency > 1 ||
      cosPhi <= 0 || cosPhi > 1 ||
      voltage <= 0 || quantity <= 0 ||
      nominalPower <= 0 || utilization <= 0 || utilization > 1 ||
      reactiveFactor <= 0
    ) {
      results.innerHTML = `<p style="color:#e53e3e; font-weight: 600;">Будь ласка, введіть коректні значення у всі поля.</p>`;
      return;
    }

    const totalPowerNominal = quantity * nominalPower;
    const activePower = totalPowerNominal * utilization;
    const reactivePower = activePower * reactiveFactor;
    const fullPower = Math.sqrt(activePower ** 2 + reactivePower ** 2);
    const currentAmps = (activePower * 1000) / (voltage * cosPhi);

    results.innerHTML = `
      <p><strong>Загальна номінальна потужність:</strong> ${totalPowerNominal.toFixed(2)} кВт</p>
      <p><strong>Активна потужність:</strong> ${activePower.toFixed(2)} кВт</p>
      <p><strong>Реактивна потужність:</strong> ${reactivePower.toFixed(2)} квар</p>
      <p><strong>Повна потужність (кВ·А):</strong> ${fullPower.toFixed(2)}</p>
      <p><strong>Розрахунковий струм (А):</strong> ${currentAmps.toFixed(2)}</p>
    `;
  });
});
