let interviewList = [];
let rejectList = [];

let activeTab = "all";

let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("Interview");
let rejectedCount = document.getElementById("Rejected");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const allCardDiv = document.getElementById("all-card");
const mainContainer = document.querySelector("main");
const filteredDiv = document.getElementById("filtered-div");
const empty = document.getElementById("empty");

function calculateCount() {
  totalCount.innerText = allCardDiv.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectList.length;

  const avaiableJob = document.getElementById("available-jobs-count");
  const totalJobs = allCardDiv.querySelectorAll(".job-card").length;

  if (activeTab == "all") {
    avaiableJob.innerText = `${totalJobs} Jobs`;
  } else if (activeTab == "interview") {
    if (interviewList.length == 0) {
      avaiableJob.innerText = `0 of ${totalJobs} Jobs`;
    } else {
      avaiableJob.innerText = `${interviewList.length} of ${totalJobs} Jobs`;
    }
  } else if (activeTab == "rejected") {
    if (rejectList.length == 0) {
      avaiableJob.innerText = `0 of ${totalJobs} Jobs`;
    } else {
      avaiableJob.innerText = `${rejectList.length} of ${totalJobs} Jobs`;
    }
  }
}

calculateCount();

function toggleStyle(id) {
  allBtn.classList.remove("bg-[#3b82f6]", "text-white");
  interviewBtn.classList.remove("bg-[#3b82f6]", "text-white");
  rejectedBtn.classList.remove("bg-[#3b82f6]", "text-white");

  allBtn.classList.add("bg-white", "text-[#64748b]");
  interviewBtn.classList.add("bg-white", "text-[#64748b]");
  rejectedBtn.classList.add("bg-white", "text-[#64748b]");

  const selected = document.getElementById(id);
  selected.classList.remove("bg-white", "text-[#64748b]");
  selected.classList.add("bg-[#3b82f6]", "text-white");

  if (id == "interview-btn") {
    activeTab = "interview";
    allCardDiv.classList.add("hidden");
    filteredDiv.classList.remove("hidden");
    renderinterview();
  } else if (id == "all-btn") {
    activeTab = "all";
    allCardDiv.classList.remove("hidden");
    filteredDiv.classList.add("hidden");
  } else if (id == "rejected-btn") {
    activeTab = "rejected";
    allCardDiv.classList.add("hidden");
    filteredDiv.classList.remove("hidden");
    renderRejected();
  }

  calculateCount();
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const locationTypeSalary = parentNode.querySelector(
      ".location-type-salary",
    ).innerText;
    const placeChange = parentNode.querySelector(".place");
    const description = parentNode.querySelector(".description").innerText;

    placeChange.classList.remove(
      "bg-[#e4f4ff]",
      "bg-green-100",
      "bg-red-100",
      "text-green-400",
      "text-red-400",
      "border-2",
    );
    placeChange.innerText = "INTERVIEW";
    placeChange.classList.add("bg-green-100", "text-green-400", "border-2");

    const cardInfo = {
      companyName,
      position,
      locationTypeSalary,
      place: "INTERVIEW",
      description,
    };

    const jobExist = interviewList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    rejectList = rejectList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    calculateCount();

    if (activeTab == "interview") {
      renderinterview();
    } else if (activeTab == "rejected") {
      renderRejected();
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const locationTypeSalary = parentNode.querySelector(
      ".location-type-salary",
    ).innerText;
    const placeChange = parentNode.querySelector(".place");
    const description = parentNode.querySelector(".description").innerText;

    placeChange.classList.remove(
      "bg-[#e4f4ff]",
      "bg-green-100",
      "bg-red-100",
      "text-green-400",
      "text-red-400",
      "border-2",
    );
    placeChange.innerText = "REJECTED";
    placeChange.classList.add("bg-red-100", "text-red-400", "border-2");

    const cardInfo = {
      companyName,
      position,
      locationTypeSalary,
      place: "REJECTED",
      description,
    };

    const jobExist = rejectList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!jobExist) {
      rejectList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    calculateCount();

    if (activeTab == "interview") {
      renderinterview();
    } else if (activeTab == "rejected") {
      renderRejected();
    }
  } else if (event.target.closest(".delete-icon")) {
    const card = event.target.closest(".job-card");
    const companyName = card.querySelector(".company-name").innerText;

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );

    rejectList = rejectList.filter((item) => item.companyName !== companyName);

    if (activeTab === "all") {
      card.remove();
    }

    if (activeTab === "interview") {
      renderinterview();
    }

    if (activeTab === "rejected") {
      renderRejected();
    }

    calculateCount();
  }
});

function renderinterview() {
  filteredDiv.innerHTML = "";

  if (interviewList.length < 1) {
    empty.classList.remove("hidden");
    filteredDiv.appendChild(empty);
    return;
  }

  empty.classList.add("hidden");

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className = "mt-6 grid grid-cols-1 gap-5";
    div.innerHTML = `
    <div
            class="job-card card-1 flex justify-between px-8 py-6 bg-white rounded-lg"
          >
            <div>
              <div>
                <h2
                  class="company-name text-[18px] text-[#002c5c] font-semibold"
                >
                  ${interview.companyName}

                </h2>

                <h4 class="position text-[#64748b]">${interview.position}</h4>
              </div>

              <p class="location-type-salary text-[#64748b] text-sm py-6 pb-8">
                ${interview.locationTypeSalary}
              </p>

              <div>
                <span
                  class="place px-4 py-3 rounded-md text-green-400 bg-green-100 border-2 font-medium"
                  >${interview.place}</span
                >
                <p class="description py-4 text-[#323b49]">
                  ${interview.description}
                </p>
              </div>
              <div class="pt-2">
                <button class="interview-btn btn btn-outline btn-success font-semibold">
                  INTERVIEW
                </button>
                <button class="rejected-btn btn btn-outline btn-error font-semibold">
                  REJECTED
                </button>
              </div>
            </div>

            <div
              class="delete-icon btn flex items-center justify-center w-8 h-8 rounded-full"
            >
              <span><i class="fa-solid fa-trash text-[#64748b]"></i></span>
            </div>
          </div>
    `;

    filteredDiv.appendChild(div);
  }
}

function renderRejected() {
  filteredDiv.innerHTML = "";

  if (rejectList.length < 1) {
    empty.classList.remove("hidden");
    filteredDiv.appendChild(empty);
    return;
  }

  empty.classList.add("hidden");

  for (let reject of rejectList) {
    let div = document.createElement("div");
    div.className = "mt-6 grid grid-cols-1 gap-5";
    div.innerHTML = `
    <div
            class="job-card card-1 flex justify-between px-8 py-6 bg-white rounded-lg"
          >
            <div>
              <div>
                <h2
                  class="company-name text-[18px] text-[#002c5c] font-semibold"
                >
                  ${reject.companyName}

                </h2>

                <h4 class="position text-[#64748b]">${reject.position}</h4>
              </div>

              <p class="location-type-salary text-[#64748b] text-sm py-6 pb-8">
                ${reject.locationTypeSalary}
              </p>

              <div>
                <span
                  class="place px-4 py-3 rounded-md font-medium bg-red-100 text-red-400 border-2"
                  >${reject.place}</span
                >
                <p class="description py-4 text-[#323b49]">
                  ${reject.description}
                </p>
              </div>
              <div class="pt-2">
                <button class="interview-btn btn btn-outline btn-success font-semibold">
                  INTERVIEW
                </button>
                <button class="rejected-btn btn btn-outline btn-error font-semibold">
                  REJECTED
                </button>
              </div>
            </div>

            <div
              class="delete-icon btn flex items-center justify-center w-8 h-8 rounded-full"
            >
              <span><i class="fa-solid fa-trash text-[#64748b]"></i></span>
            </div>
          </div>
    `;

    filteredDiv.appendChild(div);
  }
}
