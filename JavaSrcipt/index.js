var addButton=document.querySelector(".addBtn");
var modalOverLay=document.querySelector(".modalOverLay");
addButton.addEventListener("click" ,function(){
    editingIndex=null;
    contactForm.reset();
    setFormPhoto("");
    modalOverLay.hidden=false;

});
var closeButton=document.querySelector(".closeModal");
var cancelButton=document.querySelector(".btnCancelSave .btnOne");
function closeModal(){
    modalOverLay.hidden=true;
}
closeButton.addEventListener("click" , closeModal);
cancelButton.addEventListener("click", closeModal);
var contactForm=document.querySelector("#contactForm");
var nameInput=document.querySelector("#contactName");
var phoneInput=document.querySelector("#contactNumber");
var emailInput=document.querySelector("#emailAddress");
var addressInput=document.querySelector("#contactAddress");
var contactGroup=document.querySelector("#contactGroup");
var contactNotes=document.querySelector("#contactNotes");
var favorites=document.querySelector("#isFavorite");
var emergencyis=document.querySelector("#isEmergency");
var contacts= JSON.parse(localStorage.getItem("contacts")) || [];
var selectedPhoto = "";
var editingIndex = null;
var contactsList=document.querySelector("#contactsList");
var searchInput = document.querySelector("#searchInput");
var noContentsFound=document.querySelector(".noContentsFound");


contactForm.addEventListener("submit", function (event){
    event.preventDefault();
   var fullName = nameInput.value.trim();

if (fullName === "") {
    alert("Please enter a name for the contact.");
    nameInput.focus();
    return;
}
   var phoneNumber = phoneInput.value.trim();
var phonePattern = /^01[0125][0-9]{8}$/;

if (!phonePattern.test(phoneNumber)) {
    alert("Please enter an 11-digit mobile number starting with 010, 011, 012, or 015.");
    phoneInput.focus();
    return;
}
    var emailAddress=emailInput.value;
    var address=addressInput.value;
    var group=contactGroup.value;
    var notes=contactNotes.value;
    var favorite=favorites.checked;
    var emergency=emergencyis.checked;
    var contact ={
    name:fullName,
    phone:phoneNumber,
    email:emailAddress,
    address:address,
    group:group,
    notes:notes,
    favorite:favorite,
    emergency:emergency,
    photo:selectedPhoto
};
if (editingIndex === null) {
    contacts.push(contact);
} else {
    contacts[editingIndex] = contact;
}

editingIndex = null;
displayContacts();
contactForm.reset();
closeModal();
console.log(contacts);});

function contactIcon(type) {
    var paths = {
        phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L8.7 10.7a16 16 0 0 0 4.6 4.6l1.3-1.3a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 2.7 3Z"/>',
        email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
        address: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
        star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
        heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
        edit: '<path d="m16 3 5 5M3 21l5-1L21 7a3.5 3.5 0 0 0-5-5L3 15Z"/>',
        delete: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>'
    };

    return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        paths[type] + '</svg>';
}

function displayContacts() {
    saveContacts();
    contactsList.textContent = "";

    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var searchText = searchInput.value.trim().toLowerCase();

var matchesSearch =
    contact.name.toLowerCase().includes(searchText) ||
    contact.phone.includes(searchText) ||
    contact.email.toLowerCase().includes(searchText);

if (!matchesSearch) {
    continue;
}

        var card = document.createElement("div");
        card.className = "contactCard";
        card.dataset.index=i;

        card.innerHTML = `
            <div class="contactCardHeader">
                <div class="contactAvatar">
                    <span class="avatarLetter"></span>

                    <span class="contactBadge favoriteBadge">
                        ${contactIcon("star")}
                    </span>

                    <span class="contactBadge emergencyBadge">
                        ${contactIcon("heart")}
                    </span>
                </div>

                <div class="contactInfo">
                    <h3 class="contactNameText"></h3>

                    <div class="contactDetail">
                        <span class="contactIcon phoneIcon">
                            ${contactIcon("phone")}
                        </span>
                        <span class="contactPhoneText"></span>
                    </div>
                </div>
            </div>

            <div class="contactDetails">
                <div class="contactDetail contactEmailRow">
                    <span class="contactIcon emailIcon">
                        ${contactIcon("email")}
                    </span>
                    <span class="contactEmailText"></span>
                </div>

                <div class="contactDetail contactAddressRow">
                    <span class="contactIcon addressIcon">
                        ${contactIcon("address")}
                    </span>
                    <span class="contactAddressText"></span>
                </div>
            </div>

            <div class="contactTags">
                <span class="contactGroupTag"></span>

                <span class="contactEmergencyTag">
                    ${contactIcon("heart")}
                    Emergency
                </span>
            </div>

            <div class="footCard contactActions">
                <div class="contactActionGroup">
                    <a class="contactAction callAction"
                       aria-label="Call contact">
                        ${contactIcon("phone")}
                    </a>

                    <a class="contactAction mailAction"
                       aria-label="Email contact">
                        ${contactIcon("email")}
                    </a>
                </div>

                <div class="contactActionGroup">
                    <button type="button"
                            class="contactAction favoriteAction"
                            aria-label="Favorite">
                        ${contactIcon("star")}
                    </button>

                    <button type="button"
                            class="contactAction emergencyAction"
                            aria-label="Emergency">
                        ${contactIcon("heart")}
                    </button>
                    <button type="button"
                            class="contactAction editAction"
                            aria-label="Edit contact">
                        ${contactIcon("edit")}
                    </button>

                    <button type="button"
                            class="contactAction deleteAction"
                            aria-label="Delete contact">
                        ${contactIcon("delete")}
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".avatarLetter").textContent =
            contact.name.trim().charAt(0).toUpperCase();
            if (contact.photo) {
    var avatarImage = document.createElement("img");
    avatarImage.className = "contactAvatarImage";
    avatarImage.src = contact.photo;
    avatarImage.alt = contact.name;

    card.querySelector(".avatarLetter").hidden = true;
    card.querySelector(".contactAvatar").prepend(avatarImage);
}

        card.querySelector(".contactNameText").textContent = contact.name;
        card.querySelector(".contactPhoneText").textContent = contact.phone;
        card.querySelector(".contactEmailText").textContent = contact.email;
        card.querySelector(".contactAddressText").textContent = contact.address;
        card.querySelector(".contactGroupTag").textContent = contact.group;

        card.querySelector(".contactEmailRow").hidden = !contact.email;
        card.querySelector(".contactAddressRow").hidden = !contact.address;
        card.querySelector(".contactGroupTag").hidden = !contact.group;

        card.querySelector(".favoriteBadge").hidden = !contact.favorite;
        card.querySelector(".emergencyBadge").hidden = !contact.emergency;
        card.querySelector(".contactEmergencyTag").hidden = !contact.emergency;

        card.querySelector(".favoriteAction").setAttribute(
            "aria-pressed", contact.favorite
        );

        card.querySelector(".emergencyAction").setAttribute(
            "aria-pressed", contact.emergency
        );

        card.querySelector(".callAction").href = "tel:" + contact.phone;
        card.querySelector(".mailAction").href = "mailto:" + contact.email;
        card.querySelector(".mailAction").hidden = !contact.email;

        contactsList.appendChild(card);
    }

   noContentsFound.hidden = contactsList.children.length > 0;
    updateCounters();
    updateSidebars();
}

displayContacts();
contactsList.addEventListener("click", function (event) {
    var deleteButton = event.target.closest(".deleteAction");

    if (!deleteButton) {
        return;
    }

    var card = deleteButton.closest(".contactCard");
    var index = Number(card.dataset.index);

    var confirmed = window.confirm(
        "Do You Need Delete " + contacts[index].name + "?"
    );

    if (!confirmed) {
        return;
    }

    contacts.splice(index, 1);
    displayContacts();
});
contactsList.addEventListener("click", function (event) {
    var editButton = event.target.closest(".editAction");

    if (!editButton) {
        return;
    }

    var card = editButton.closest(".contactCard");
    editingIndex = Number(card.dataset.index);

    var contact = contacts[editingIndex];

    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    addressInput.value = contact.address;
    contactGroup.value = contact.group;
    contactNotes.value = contact.notes;
    favorites.checked = contact.favorite;
    emergencyis.checked = contact.emergency;
    setFormPhoto(contact.photo);
    modalOverLay.hidden = false;
    nameInput.focus();
});
contactsList.addEventListener("click", function (event) {
    var favoriteButton = event.target.closest(".favoriteAction");
    var emergencyButton = event.target.closest(".emergencyAction");

    if (!favoriteButton && !emergencyButton) {
        return;
    }

    var button = favoriteButton || emergencyButton;
    var card = button.closest(".contactCard");
    var index = Number(card.dataset.index);

    if (favoriteButton) {
        contacts[index].favorite = !contacts[index].favorite;
    } else {
        contacts[index].emergency = !contacts[index].emergency;
    }

    displayContacts();
});
function updateCounters() {
    var favoriteTotal = 0;
    var emergencyTotal = 0;

    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].favorite) {
            favoriteTotal++;
        }

        if (contacts[i].emergency) {
            emergencyTotal++;
        }
    }

    document.querySelector(".p-1 p:last-child").textContent =
        contacts.length;

    document.querySelector(".p-2 p:last-child").textContent =
        favoriteTotal;

    document.querySelector(".p-3 p:last-child").textContent =
        emergencyTotal;

    document.querySelector(".leftDiv > div:first-child p").textContent =
        "Manage and organize your " + contacts.length +
        (contacts.length === 1 ? " contact" : " contacts");
}
function createSidebarContact(contact) {
    var row = document.createElement("div");
    row.className = "sidebarContact";

    var avatar = document.createElement("div");
    avatar.className = "sidebarAvatar";
    avatar.textContent = contact.name.trim().charAt(0).toUpperCase();

    var info = document.createElement("div");
    info.className = "sidebarContactInfo";

    var name = document.createElement("strong");
    name.textContent = contact.name;

    var phone = document.createElement("span");
    phone.textContent = contact.phone;

    var call = document.createElement("a");
    call.className = "sidebarCall";
    call.href = "tel:" + contact.phone;
    call.setAttribute("aria-label", "Call " + contact.name);
    call.innerHTML = contactIcon("phone");

    info.appendChild(name);
    info.appendChild(phone);

    row.appendChild(avatar);
    row.appendChild(info);
    row.appendChild(call);

    return row;
}

function updateSidebars() {
    var favoritesList = document.querySelector("#favoritesList");
    var emergencyList = document.querySelector("#emergencyList");
    var noFavYet = document.querySelector(".noFavYet");
    var noEmergency = document.querySelector(".noEmergency");

    favoritesList.textContent = "";
    emergencyList.textContent = "";

    var favoriteTotal = 0;
    var emergencyTotal = 0;

    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];

        if (contact.favorite) {
            favoritesList.appendChild(createSidebarContact(contact));
            favoriteTotal++;
        }

        if (contact.emergency) {
            emergencyList.appendChild(createSidebarContact(contact));
            emergencyTotal++;
        }
    }

    noFavYet.hidden = favoriteTotal > 0;
    noEmergency.hidden = emergencyTotal > 0;

    favoritesList.hidden = favoriteTotal === 0;
    emergencyList.hidden = emergencyTotal === 0;
}
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
searchInput.addEventListener("input", function () {
    displayContacts();
});
var changePhotoButton = document.querySelector(".changePhoto");
var photoInput = document.querySelector("#photoInput");
var photoContainer = document.querySelector(".svgForm");


changePhotoButton.addEventListener("click", function () {
    photoInput.click();
});

photoInput.addEventListener("change", function () {
    var file = photoInput.files[0];

    if (!file) {
        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Please choose a JPG, PNG, or WebP image.");
        photoInput.value = "";
        return;
    }

    if (file.size > 1024 * 1024) {
        alert("Please choose an image smaller than 1 MB.");
        photoInput.value = "";
        return;
    }

    var reader = new FileReader();

    reader.addEventListener("load", function () {
        selectedPhoto = reader.result;

        var preview = photoContainer.querySelector(".photoPreview");

        if (!preview) {
            preview = document.createElement("img");
            preview.className = "photoPreview";
            preview.alt = "Contact photo";
            photoContainer.appendChild(preview);
        }

        preview.src = selectedPhoto;
    });

    reader.readAsDataURL(file);
});
function setFormPhoto(photo) {
    selectedPhoto = photo || "";

    var container = document.querySelector(".svgForm");
    var preview = container.querySelector(".photoPreview");

    document.querySelector("#photoInput").value = "";

    if (preview) {
        preview.remove();
    }

    if (selectedPhoto) {
        var image = document.createElement("img");
        image.className = "photoPreview";
        image.src = selectedPhoto;
        image.alt = "Contact photo";
        container.appendChild(image);
    }
}












