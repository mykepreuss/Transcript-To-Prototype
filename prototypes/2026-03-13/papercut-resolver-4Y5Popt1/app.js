const state = {
    activeIssueId: null,
    isProcessing: false
};

// Embedded Data derived from prototype spec
const data = {
    highlights: [
        { label: "Active Papercuts", value: "14", detail: "Awaiting triage", tone: "neutral" },
        { label: "PRs Drafted", value: "32", detail: "This week", tone: "positive" },
        { label: "Avg. Resolution", value: "< 2 hours", detail: "From report to PR", tone: "positive" }
    ],
    triageRows: [
        {
            id: "issue-1",
            issue: "Misaligned submit button on mobile",
            source: "Support Ticket #492",
            status: "Drafting",
            proposedFixShort: "Adjust CSS padding",
            reviewDetails: {
                title: "Misaligned submit button on mobile",
                currentBehaviour: "On mobile viewports (under 480px), the primary submit button on the checkout form overlaps with the terms and conditions text, causing accidental clicks.",
                proposedFixLong: "Update the flex container padding from 1rem to 1.5rem and add a margin-bottom to the button component to ensure adequate touch target spacing. A pull request has been staged in the frontend repository."
            }
        },
        {
            id: "issue-2",
            issue: "Typo in billing error message",
            source: "Slack (Internal)",
            status: "Ready for Review",
            proposedFixShort: "Update text string in i18n",
            reviewDetails: {
                title: "Typo in billing error message",
                currentBehaviour: "When a credit card is declined, the error message reads 'Your card was declinded. Please try again.' containing a spelling error.",
                proposedFixLong: "Locate the key 'billing.error.declined' in the English i18n JSON file and correct the spelling from 'declinded' to 'declined'. A pull request has been drafted to update the localisation files."
            }
        },
        {
            id: "issue-3",
            issue: "Hover colour contrast too low",
            source: "Design QA",
            status: "Needs Approval",
            proposedFixShort: "Update hex value to #333333",
            reviewDetails: {
                title: "Hover Colour Contrast",
                currentBehaviour: "The 'Cancel' button uses a light grey text on a white background on hover, failing accessibility guidelines.",
                proposedFixLong: "Update the hover state text colour to a darker grey (#4B5563) to meet WCAG AA contrast requirements. A pull request has been staged for the front-end repository. No structural changes were made to the component."
            }
        }
    ],
    workflowSteps: [
        "Review the plain-text description of the AI proposed fix.",
        "Verify the visual difference matches the intended behaviour.",
        "Approve the generated code changes to merge the automated PR."
    ]
};

// DOM Elements
const els = {
    highlightsContainer: document.getElementById('highlights-container'),
    triageTbody: document.getElementById('triage-tbody'),
    emptyState: document.getElementById('empty-state'),
    reviewContent: document.getElementById('review-content'),
    workflowContent: document.getElementById('workflow-content'),
    actionFooter: document.getElementById('action-footer'),
    approveBtn: document.getElementById('approve-btn')
};

// Utilities
const formatStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
};

// Rendering Functions
function renderHighlights() {
    els.highlightsContainer.innerHTML = data.highlights.map(h => `
        <div class="highlight-card">
            <div class="highlight-label">${h.label}</div>
            <div class="highlight-value">${h.value}</div>
            <div class="highlight-detail">${h.detail}</div>
        </div>
    `).join('');
}

function renderTable() {
    els.triageTbody.innerHTML = data.triageRows.map(row => `
        <tr data-id="${row.id}" class="${state.activeIssueId === row.id ? 'active' : ''}">
            <td class="cell-issue">${row.issue}</td>
            <td class="cell-source">${row.source}</td>
            <td class="cell-status"><span class="${formatStatusClass(row.status)}">${row.status}</span></td>
            <td class="cell-fix">${row.proposedFixShort}</td>
        </tr>
    `).join('');

    // Attach event listeners to new rows
    document.querySelectorAll('#triage-tbody tr').forEach(tr => {
        tr.addEventListener('click', (e) => {
            if(state.isProcessing) return;
            const id = e.currentTarget.getAttribute('data-id');
            selectIssue(id);
        });
    });
}

function renderReviewPanel(issueData) {
    if (!issueData) {
        els.emptyState.classList.remove('hidden');
        els.reviewContent.classList.add('hidden');
        els.workflowContent.classList.add('hidden');
        els.actionFooter.classList.add('hidden');
        return;
    }

    els.emptyState.classList.add('hidden');
    els.reviewContent.classList.remove('hidden');
    els.workflowContent.classList.remove('hidden');
    els.actionFooter.classList.remove('hidden');

    // Review Text
    els.reviewContent.innerHTML = `
        <h3 class="review-title">Review Proposed Change: ${issueData.reviewDetails.title}</h3>
        <div class="behaviour-block current">
            <span class="block-label">Current Behaviour</span>
            <p>${issueData.reviewDetails.currentBehaviour}</p>
        </div>
        <div class="behaviour-block proposed">
            <span class="block-label">AI Proposed Fix</span>
            <p>${issueData.reviewDetails.proposedFixLong}</p>
        </div>
    `;

    // Workflow Steps
    els.workflowContent.innerHTML = `
        <h3>Resolution Workflow</h3>
        <p class="panel-desc">Steps to deploy this fix.</p>
        <ul class="workflow-list" id="workflow-list">
            ${data.workflowSteps.map(step => `<li>${step}</li>`).join('')}
        </ul>
    `;

    // Reset Button State based on status
    const btnText = els.approveBtn.querySelector('.btn-text');
    if (issueData.status === 'Drafting') {
        els.approveBtn.disabled = true;
        btnText.textContent = "AI is drafting code...";
    } else if (issueData.status === 'Merged') {
        els.approveBtn.disabled = true;
        btnText.textContent = "Fix Deployed";
    } else {
        els.approveBtn.disabled = false;
        btnText.textContent = "Approve & Merge Fix";
    }
}

// Actions
function selectIssue(id) {
    state.activeIssueId = id;
    renderTable(); // Update active class
    const issueData = data.triageRows.find(r => r.id === id);
    renderReviewPanel(issueData);
}

function handleApprove() {
    if (!state.activeIssueId || state.isProcessing) return;
    
    state.isProcessing = true;
    els.approveBtn.disabled = true;
    const btnText = els.approveBtn.querySelector('.btn-text');
    btnText.textContent = "Merging pull request...";

    // Simulate network delay and workflow progression
    setTimeout(() => {
        // Mark workflow steps as complete visually
        const steps = document.querySelectorAll('#workflow-list li');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('completed');
            }, index * 300);
        });

        setTimeout(() => {
            // Update data
            const issueIndex = data.triageRows.findIndex(r => r.id === state.activeIssueId);
            if(issueIndex > -1) {
                data.triageRows[issueIndex].status = "Merged";
            }
            
            // Update UI
            state.isProcessing = false;
            btnText.textContent = "Fix Deployed Successfully";
            renderTable();
            
            // Update highlights roughly to simulate metrics change
            data.highlights[0].value = parseInt(data.highlights[0].value) - 1;
            renderHighlights();

        }, (steps.length * 300) + 500);

    }, 800);
}

// Initialization
function init() {
    renderHighlights();
    renderTable();
    
    els.approveBtn.addEventListener('click', handleApprove);
}

document.addEventListener('DOMContentLoaded', init);
