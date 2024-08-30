const apiBaseUrl = "https://gohumorous-form.up.railway.app";
// const apiBaseUrl = "http://localhost:8000";
const formUrl = `${apiBaseUrl}/api/leadpush`;

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function validateSubmit(id = "1") {
  const validateEle = document.getElementById(`validate-text-${id}`);
  const emailEle = document.getElementById(`email-form-${id}`);
  const email = emailEle.value;
  document.getElementById(`hero-form-${id}`).style.display = "block";
  if (!email) {
    validateEle.style.display = "block";
    validateEle.innerHTML = "Please enter your email address 😉";
  } else if (!validateEmail(email)) {
    validateEle.style.display = "block";
    validateEle.innerHTML = "Please enter your valid email address 😉";
  } else {
    validateEle.style.display = "none";
    submit(email, id);
  }
}

async function submit(email, id) {
  console.log("submit");
  const successEle = document.getElementById(`success-text-${id}`);
  const errorEle = document.getElementById(`error-text-${id}`);

  try {
    gtag("event", "form-submit", {
      email,
    });

    window.lintrk("track", { conversion_id: 13809105 });
  } catch (error) {
    console.error("Error in posting to gtag", error);
  }

  try {
    const res = await fetch(formUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pageName: window.location.pathname }),
    });
    const data = await res.json();
    if (data.message) {
      successEle.style.display = "block";
    } else {
      errorEle.style.display = "block";
    }
  } catch (error) {
    errorEle.style.display = "block";
  }
}
