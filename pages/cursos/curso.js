const visaCuotas = [1,3,6,12]
const CFT = [
    {
        cuota: 1,
        cft: 0 // 0%
    },
    {
        cuota: 3,
        cft: 0.6 // 60%
    },
    {
        cuota: 6,
        cft: 0.9 // 90%
    },
    {
        cuota: 12,
        cft: 1.2 // 120%
    },
    {
        cuota: 18,
        cft: 1.4 // 140%
    },
]
const mastercardCuotas = [1,3,6,12,18]

function showForm() {
    let formDiv = document.getElementById('form-compra');
    formDiv.style.display = 'block'
}

function showPago(element) {
    let callbackValue = element.value;
    let tarjDiv = document.getElementById('tarjeta_pago');
    let transfDiv = document.getElementById('transferencia_pago');
    if (callbackValue == 'transf') {
        transfDiv.style.display = 'block'
        tarjDiv.style.display = 'none'
    } else if (callbackValue == 'tarj') {
        transfDiv.style.display = 'none'
        tarjDiv.style.display = 'block'
    } else {
        transfDiv.style.display = 'none'
        tarjDiv.style.display = 'none'
    }
}

function setCuotas(element) {
    let selectedCard = element.value;
    let price = parseFloat(document.getElementById('price').value);
    let availableInstallments = []
    switch (selectedCard) {
        case 'VISA':
            availableInstallments = visaCuotas
            break;
        case 'MASTERCARD':
            availableInstallments = mastercardCuotas
            break;
        case 'VISADEBITO':
        case 'MASTERCARDDEBITO':
            availableInstallments = [1]
            break;

    }

    let installments = []
    let selectTag = document.getElementById('cuotas_tarjeta');
    this.cleanSelect(selectTag);
    availableInstallments.forEach(installment => {
        let installmentCFT = CFT.find(element => element.cuota == installment)
        let installmentValue = price + (price * installmentCFT.cft)
        let fullInstallment = {
            cuota: installment,
            value: installmentValue / installment,
            finalPrice: installmentValue
        }
        installments.push(fullInstallment)

        let opt = document.createElement("option");
        opt.value = fullInstallment.cuota; // the index
        opt.innerHTML = installment + ' cuota/s de ' + fullInstallment.value.toString() + '. Total: ' + fullInstallment.finalPrice;
        selectTag.append(opt);
    });
}

function cleanSelect(selectElement) {
    var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}

function validatePurchase(e) {
    e.preventDefault();
    if (confirm('Esta por proceder a la compra del curso. ¿Está seguro?')) {
        window.location.reload()
        return true
    } else {
        alert('no se realizo la compra');
    }
    return false
}