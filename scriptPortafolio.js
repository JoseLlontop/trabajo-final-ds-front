document.addEventListener('DOMContentLoaded', () => {
    const agregarTransferenciaBtn = document.getElementById('agregar-transferencia');
    const eliminarUltimaTransferenciaBtn = document.getElementById('eliminar-ultima-transferencia');
    const agregarChequeBtn = document.getElementById('agregar-cheque');
    const eliminarUltimoChequeBtn = document.getElementById('eliminar-ultimo-cheque');
    const listaTransferencias = document.getElementById('lista-transferencias');
    const listaCheques = document.getElementById('lista-cheques');

    // Hardcodear opciones para obra social, banco y factura
    const obrasSociales = [
        { id: 1, nombre: 'IOMA' },
        { id: 2, nombre: 'OSPE' },
    ];

    const bancos = [
        { id: 1, nombre: 'Banco Galicia' },
        { id: 2, nombre: 'Banco Credicoop' },
    ];

    const facturas = [
        { id: 1, cae: '2543654765756' },
        { id: 2, cae: '6575634543544' },
    ];

    const selectObraSocial = document.getElementById('obra-social');
    const selectBancos = document.getElementById('banco');
    const selectFacturas = document.getElementById('factura');

    obrasSociales.forEach(obraSocial => {
        const option = document.createElement('option');
        option.value = obraSocial.id;
        option.text = obraSocial.nombre;
        selectObraSocial.appendChild(option);
    });

    bancos.forEach(banco => {
        const option = document.createElement('option');
        option.value = banco.id;
        option.text = banco.nombre;
        selectBancos.appendChild(option);
    });

    facturas.forEach(factura => {
        const option = document.createElement('option');
        option.value = factura.id;
        option.text = factura.cae;
        selectFacturas.appendChild(option);
    });

    // Código de manejo de transferencias y cheques como lo tenías previamente
    eliminarUltimaTransferenciaBtn.addEventListener('click', () => {
        const transferencias = listaTransferencias.querySelectorAll('li');
        if (transferencias.length > 0) {
          listaTransferencias.removeChild(transferencias[transferencias.length - 1]);
        }
    });

    eliminarUltimoChequeBtn.addEventListener('click', () => {
        const cheques = listaCheques.querySelectorAll('li');
        if (cheques.length > 0) {
          listaCheques.removeChild(cheques[cheques.length - 1]);
        }
    });

    agregarTransferenciaBtn.addEventListener('click', () => {
        const cuentaOrigen = document.getElementById('cuenta-origen').value.trim();
        const cuentaDestino = document.getElementById('cuenta-destino').value.trim();
        const montoTransferencia = document.getElementById('monto-transferencia').value.trim();
        const banco = document.getElementById('banco').value.trim();

        if (cuentaOrigen && cuentaDestino && montoTransferencia && banco) {
            const li = document.createElement('li');
            li.textContent = `Cuenta Origen: ${cuentaOrigen}, Cuenta Destino: ${cuentaDestino}, Monto: ${montoTransferencia}, Banco: ${banco}`;
            listaTransferencias.appendChild(li);

            document.getElementById('cuenta-origen').value = '';
            document.getElementById('cuenta-destino').value = '';
            document.getElementById('monto-transferencia').value = '';
            document.getElementById('banco').value = '';
        }
    });

    agregarChequeBtn.addEventListener('click', () => {
        const numeroCheque = document.getElementById('numero-cheque').value.trim();
        const montoCheque = document.getElementById('monto-cheque').value.trim();

        if (numeroCheque && montoCheque) {
            const li = document.createElement('li');
            li.textContent = `Número de Cheque: ${numeroCheque}, Monto: ${montoCheque}`;
            listaCheques.appendChild(li);

            document.getElementById('numero-cheque').value = '';
            document.getElementById('monto-cheque').value = '';
        }
    });
});
