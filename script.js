document.addEventListener('DOMContentLoaded', () => {
    const agregarTransferenciaBtn = document.getElementById('agregar-transferencia');
    const eliminarUltimaTransferenciaBtn = document.getElementById('eliminar-ultima-transferencia');
    const agregarChequeBtn = document.getElementById('agregar-cheque');
    const eliminarUltimoChequeBtn = document.getElementById('eliminar-ultimo-cheque');
    const listaTransferencias = document.getElementById('lista-transferencias');
    const listaCheques = document.getElementById('lista-cheques');

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
        // Limpiar campos después de agregar transferencia
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
        // Limpiar campos después de agregar cheque
        document.getElementById('numero-cheque').value = '';
        document.getElementById('monto-cheque').value = '';
      }
    });

    const selectBancos = document.getElementById('banco');
    
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/api/bancos', true); // Supongamos que tienes un archivo JSON llamado obras_sociales.json que contiene los datos de las obras sociales
        xhr.onload = function() {
            if (xhr.status === 200) {
                const bancos = JSON.parse(xhr.responseText);

                // Iterar sobre los datos de las obras sociales y agregar cada una al menú desplegable
                bancos.forEach(function(banco) {
                    const option = document.createElement('option');
                    option.text = banco.nombre;
                    option.value = banco.id;
                    selectBancos.appendChild(option);
                });
            } else {
                console.error('Error al cargar los bancos.');
            }
        };
        xhr.send();

        const selectObraSocial = document.getElementById('obra-social');
        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'http://localhost:8080/api/obrasocial', true); // Supongamos que tienes un archivo JSON llamado obras_sociales.json que contiene los datos de las obras sociales
        xhr2.onload = function() {
            if (xhr2.status === 200) {
                const obras_sociales = JSON.parse(xhr2.responseText);

                // Iterar sobre los datos de las obras sociales y agregar cada una al menú desplegable
                obras_sociales.forEach(function(obraSocial) {
                    const option = document.createElement('option');
                    option.text = obraSocial.nombre;
                    option.value = obraSocial.id;
                    selectObraSocial.appendChild(option);
                });
            } else {
                console.error('Error al cargar las obras sociales.');
            }
        };
        xhr2.send();

        
    const selectFacturas = document.getElementById('factura');

      // Hacer una solicitud AJAX para obtener los datos de las facturas
      const xhrr = new XMLHttpRequest();
      xhrr.open('GET', 'http://localhost:8080/api/facturas', true); 
      xhrr.onload = function() {
          if (xhrr.status === 200) {
              const facturas = JSON.parse(xhrr.responseText);

              // Iterar sobre los datos de las facturas y agregar cada una al menú desplegable
              facturas.forEach(function(factura) {
                  const option = document.createElement('option');
                  option.text = factura.cae;
                  option.value = factura.id;
                  selectFacturas.appendChild(option);
              });
          } else {
              console.error('Error al cargar las facturas.');
          }
      };
      xhrr.send();

    // Manejar el envío del formulario
    document.getElementById('formulario').addEventListener('submit', (event) => {
      event.preventDefault();

      const descripcion = document.getElementById('descripcion').value.trim();
      const monto = document.getElementById('monto').value.trim();
      const razonSocial = document.getElementById('razon-social').value.trim();
      const obraSocial = document.getElementById('obra-social').value.trim();
      const factura = document.getElementById('factura').value.trim();

      const transferencias = Array.from(listaTransferencias.children).map(li => {
        
        // Analizar la cadena de texto y convertirla en un objeto
        const parts = li.textContent.split(', ');
        return {
          cuenta_origen: parts[0].split(': ')[1],
          cuenta_destino: parts[1].split(': ')[1],
          monto: parts[2].split(': ')[1],
          banco: { id: parseInt(parts[3].split(': ')[1]) }
        };
      });

      const numero = 11111;
       // Obtener la fecha actual
       const fechaActual = new Date();

       // Formatear la fecha como 'yyyy-MM-dd'
       const formattedDate = fechaActual.toISOString().split('T')[0];
      const cheques = Array.from(listaCheques.children).map(li => {
        // Analizar la cadena de texto y convertirla en un objeto
        const parts = li.textContent.split(', ');
        return {
          fecha_emision: formattedDate,
          nro_cheque: parseInt(parts[0].split(': ')[1]),
          monto: parseFloat(parts[1].split(': ')[1]),

        };
      });

      // Aquí puedes enviar la información con un POST request
      const data = {
        descripcion : descripcion,
        fecha: formattedDate,
        monto: monto,
        numero: numero,
        razon_social: razonSocial,
        cliente:{id:parseInt(obraSocial)},
        factura: {id: parseInt(factura)},
        transferencias,
        cheques
      };
      console.log(data);
      axios.post('http://localhost:8080/api/cobranzas', data)
      .then(response => {
        console.log('Solicitud exitosa:', response.data);
        // Puedes agregar lógica adicional aquí si es necesario
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    

      // Lógica para enviar la data mediante un POST request
    });
  });