const answers = {
    q1: "confidentiality",
    q2: ["Administrators", "Updates", "Circumvented"],
    q3: ["Larger files", "Security"],
    q4: ["Authentication", "Authorization", "Accounting"],
    q5: ["Backing", "Consequences", "Rules"],
    q6: "|",
    q7: "a list of all established active TCP connections",
    q8: "The administrator has more control over the operating system.",
    q9: ["data in-transit", "data in-process", "stored data"],
    q10: ["KDE", "Gnome"],
    q11: "rootkit",
    q12: "An HIDS monitors operating systems on host computers and processes file system activity. Firewalls allow or deny traffic between the computer and other systems.",
    q13: "read, write, execute",
    q14: {
        pwd: "Displays the name of the current working directory",
        sudo: "Runs a command as another user",
        chmod: "Modifies file permissions",
        ps: "Lists the processes that are currently running",
    },
    q15: "It is a rule-based firewall application in Linux.",
    q16: "Group Policy Editor",
    q17: {
        email: "Provides filtering of SPAM and potentially malicious emails before they reach the endpoint",
        web: "Provides filtering of websites and blacklisting before they reach the endpoint",
        nac: "Permits only authorized and compliant systems to connect to the network",
        amp: "Provides endpoint protection from viruses and malware",
    },
    q18: {
        secure: "Used by RedHat and CentOS computers and tracks authentication-related events",
        messages: "Contains generic computer activity logs, and is used to store informational and noncritical system messages",
        dmesg: "Stores information related to hardware devices and their drivers",
        auth: "Used by Debian and Ubuntu computers and stores all authentication-related events",
    },
    q19: {
        signature: "Recognizes characteristics of known malware files",
        heuristics: "Recognizes general features shared by types of malware",
        behavior: "Recognizes malware through analysis of suspicious actions",
    },
    q20: "443",
    q21: "It is a sandbox product for analyzing malware behaviors.",
    q22: "It is an open source Linux security distribution containing many penetration tools.",
    q23: {
        registry: "A hierarchical database of all system and user information",
        firewall: "Windows Firewall",
        powershell: "PowerShell",
        event: "Event Viewer",
    },
    q24: ["system backups", "system resiliency", "equipment maintenance"],
    q25: "to check the CPU usage of the PC",
    q26: "The kernel provisions hardware resources to meet software requirements.",
    q27: "Implement a firewall.",
    q28: {
        dir: "lists files in a directory",
        mkdir: "creates a new directory",
        cd: "changes the current directory",
        ren: "renames a file",
    },
    q29: "PowerShell script",
    q30: "It compares the operations of a host against well-defined security rules.",
};

// Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

// Function to shuffle the dropdown options
function shuffleDropdowns() {
    document.querySelectorAll('.question select').forEach(select => {
        const options = Array.from(select.options); // Convert options to an array
        
        // Find the first option (the one that should remain at the top)
        const firstOption = options[0];

        // Get the rest of the options excluding the first one
        const otherOptions = options.slice(1);

        // Shuffle the other options
        shuffleArray(otherOptions);

        // Clear the current options
        select.innerHTML = "";

        // Append the first option back to the top
        select.appendChild(firstOption);

        // Append the shuffled options back to the select element
        otherOptions.forEach(option => {
            select.appendChild(option);
        });

        // Set the first option as the default selected option
        select.selectedIndex = 0;
    });
}

// Call shuffleDropdowns when the page loads
window.addEventListener('load', shuffleDropdowns);

// Handle Submit
document.getElementById("submitButton").addEventListener("click", () => {
    const form = document.forms["quizForm"];
    let score = 0;
    const total = Object.keys(answers).length;

    // Clear previous styles
    document.querySelectorAll(".question li").forEach((li) => {
        li.classList.remove("correct", "incorrect");
    });

    for (let key in answers) {
        const questionElement = document.getElementById(key);
        const userAnswers = [...form.elements[key]]
            .filter((input) => input.checked || input.tagName.toLowerCase() === 'select')
            .map((input) => input.value);

        let isCorrect = false;

        if (questionElement.querySelector('select')) {
            const selects = questionElement.querySelectorAll('select');
            selects.forEach((select, index) => {
                const selectedValue = select.value;
                const correctValue = answers[key][Object.keys(answers[key])[index]];

                if (selectedValue === correctValue) {
                    select.classList.add("correct");
                } else if (selectedValue !== "") {
                    select.classList.add("incorrect");
                }

                Array.from(select.options).forEach(option => {
                    if (option.value === correctValue) {
                        option.classList.add("correct");
                    } else {
                        option.classList.remove("correct");
                    }
                });
            });
        } else {
            isCorrect = Array.isArray(answers[key])
                ? answers[key].every((answer) => userAnswers.includes(answer)) &&
                  userAnswers.length === answers[key].length
                : userAnswers[0] === answers[key];
        }

        questionElement.querySelectorAll("li").forEach((li) => {
            const input = li.querySelector("input");
            if (input) {
                if (input.checked) {
                    if (isCorrect) {
                        li.classList.add("correct");
                    } else {
                        li.classList.add("incorrect");
                    }
                }

                if (Array.isArray(answers[key]) && answers[key].includes(input.value)) {
                    li.classList.add("correct");
                } else if (answers[key] === input.value) {
                    li.classList.add("correct");
                }
            }
        });

        if (isCorrect) {
            score++;
        }
    }

    document.getElementById("result").textContent = `You scored ${score} out of ${total}!`;
    window.scrollTo(0, 0);
});

// Handle Reset
document.getElementById("resetButton").addEventListener("click", () => {
    const form = document.forms["quizForm"];
    form.reset();

    document.querySelectorAll('.correct, .incorrect').forEach((element) => {
        element.classList.remove('correct', 'incorrect');
    });XMLDocument

    window.scrollTo(0, 0);
    document.getElementById("result").textContent = "";

    // Shuffle the dropdown options again when resetting
    shuffleDropdowns();
});

// Ensure the radio button is toggled when clicking on the li
document.querySelectorAll('.question li').forEach(li => {
    li.addEventListener('click', function() {
        const radioButton = this.querySelector('input[type="radio"]');
        if (radioButton) {
            radioButton.checked = true;  // Set the radio button to checked
        }
    });
});
