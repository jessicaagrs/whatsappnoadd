const buttonSubmit = document.querySelector('button[type="submit"]');
const inputPhone = document.querySelector('input[type="tel"]');
const buttonInfo = document.querySelector('#info-button');

buttonSubmit.addEventListener('click', event => {
  event.preventDefault();
  const form = event.target.closest('form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const phone = data.phone.trim().replace(/\s/g, '');
  
  if (!data.phone || phone.length < 13) {
    viewError();
    return;
  }
  
  startLoading();
  let message = '';
  if (data.message.length > 0) {
    message = `Mensagem:%20${data.message}`;
  }
  const URL = `https://wa.me/${phone}?text=${message}`;
  setTimeout(() => {
    window.open(URL, '_blank');
    stopLoading();
  }, 2000);

  form.reset();
});

inputPhone.addEventListener('input', event => {
  let value = event.target.value;

  value = value.replace(/\D/g, '');

  if (value.length > 13) {
    value = value.slice(0, 13);
  }

  if (value.length >= 2) {
    value = value.replace(/^(\d{2})/, '$1 ');
  }
  if (value.length >= 4) {
    value = value.replace(/^(\d{2}) (\d{2})/, '$1 $2 ');
  }

  event.target.value = value;
});

buttonInfo.addEventListener('click', event => {
  event.preventDefault();

  const infoContainer = document.getElementById('info-container');

  infoContainer.classList.toggle('active');
});

function viewError() {
  const errorContainer = document.getElementById('error');
  errorContainer.classList.add('active');
  setTimeout(() => {
    errorContainer.classList.remove('active');
  }, 4000);
}

function startLoading() {
  buttonSubmit.textContent = 'Aguarde...';
  buttonSubmit.disabled = true;
}

function stopLoading() {
  buttonSubmit.textContent = 'Enviar';
  buttonSubmit.disabled = false;
}
