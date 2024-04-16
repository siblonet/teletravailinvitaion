let inv_id;

function getUrlParameter() {
    let url = window.location.href;
    let match = url.match(/\?(.*)/);

    if (match) {
        return decodeURIComponent(match[1]);
    } else {
        return null;
    }
}



const managerInit = async () => {
    const retriva = getUrlParameter();
    //detaila?ov=${product._id}"
    if (!retriva) {
        window.location.href = "/"
    } else {
        inv_id = retriva;
        const invited_data = `
        <br>
        <br>
        <div class="form-style-5">
            <form>
                <fieldset>
                    <legend>
                        <span class="number">
                            1
                        </span>
                        Numéro WhatsApp (+1....)
                    </legend>
                        <input type="tel" id="invphone" name="phone" placeholder="Téléphone avec extension*">
                </fieldset>
                <a class="gener" onclick="ValiderInvita()">
                Valider
            </a>
            </form>
        </div>

        <div id="messagesa">
                
        </div>
        `
        document.getElementById('handlebody').innerHTML = invited_data;
    }

}

managerInit();


const ValiderInvita = async () => {
    const invphone = document.getElementById('invphone').value;

    if (invphone.startsWith("+")) {
        const data = {
            _id: inv_id,
            phone: invphone
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("https://nuance-doud.adaptable.app/instapay/invited/invitation", options);
        const responseData = await response.json();
        const messages = document.getElementById('messagesa');
        messages.classList.add("form-style-5");
        messages.innerHTML = `
            <form>
                <fieldset id="linkmessaa"></fieldset>
            </form>
        `;

        if (!response.ok) {
            document.getElementById('linkmessaa').innerHTML = `
                <legend style="color: #bc1a42;">
                    <span class="erro">3</span>
                    Échec, vérifiez votre connexion ou essayez plus tard.
                 </legend>
            `;
        } else if (responseData.done) {
            window.location.href = "https://chat.whatsapp.com/IbeLaLfLGKyA8tC5C53Ull";
        } else if (responseData.ee) {
            document.getElementById('linkmessaa').innerHTML = `
                <legend>
                    <span class="number">3</span>
                    Vous y êtes déjà !
                 </legend>
            `;
        } else {
            document.getElementById('linkmessaa').innerHTML = `
                <legend style="color: #bc1a42;">
                    <span class="erro">3</span>
                    Échec, vérifiez votre connexion ou essayez plus tard.
                 </legend>
            `;
        }
    } else {
        const messagesr = document.getElementById('messagesa');
        messagesr.classList.add("form-style-5");
        messagesr.innerHTML = `
            <form>
                <fieldset id="linkmessaa">
                    <legend style="color: #bc1a42;">
                        <span class="erro">3</span>
                        Votre numéro WhatsApp avec l'indicatif du pays.
                    </legend>
                </fieldset>
            </form>
        `;

        setTimeout(() => {
            messagesr.innerHTML = "";
            messagesr.classList.remove("form-style-5");
        }, 3000);
    }
};

