const tasks={
intent:{kicker:'WHAT DOES THE HUMAN MEAN?',title:'Ground the request.',description:'Use speech, measured gaze, human and robot views, and interaction history to infer a grounded task description, target objects, destinations, and a nominal execution plan.',metrics:'Metrics: Slot F1 · Location accuracy · Plan exact match · Entity–visibility F1',label:'STRUCTURED INTENT · ILLUSTRATIVE',examples:[['Request','“Please bring that object over for me.”'],['Resolve','Object · destination · interaction context'],['Plan','Navigate → retrieve → navigate → hand over']]},
planning:{kicker:'WHAT SHOULD HAPPEN NEXT?',title:'Track progress. Update the plan.',description:'Combine grounded intent with current robot observations, state, and execution history to keep the current subtask, advance to the next, or end the episode.',metrics:'Metrics: Decision accuracy · Macro-F1 · Next type · Core subgoal · Completion F1',label:'CLOSED-LOOP DECISIONS · ILLUSTRATIVE',examples:[['Continue','The current subtask is still in progress.'],['Switch','Current subtask complete → predict the next subgoal.'],['Done','The episode goal has been satisfied.']]},
navigation:{kicker:'WHERE SHOULD THE ROBOT GO?',title:'Move through the household.',description:'A vision-language navigation model turns a navigation subgoal and visual context into movement commands. MID-360 LiDAR is additionally used for collision avoidance.',metrics:'Metrics: Offline action accuracy · Macro-F1 · STOP recall · STOP F1',label:'NAVIGATION EXECUTION · ILLUSTRATIVE',examples:[['Subgoal','Move toward the task-relevant location.'],['Actions','Forward · Left · Right · Stop'],['Evaluation','Compare predictions with recorded navigation targets.']]},
manipulation:{kicker:'HOW SHOULD THE ROBOT INTERACT?',title:'Turn a subgoal into motion.',description:'A VLA or world-action model uses robot observations, state, and a manipulation subgoal to generate low-level arm and gripper control commands.',metrics:'Metrics: Joint MSE · End-effector position error · End-effector rotation error',label:'MANIPULATION EXECUTION · ILLUSTRATIVE',examples:[['Input','Subgoal · robot camera views · robot state'],['Output','Arm and gripper action sequence'],['Evaluation','First predicted action and 24-step action chunks']]}
};
const resultSets={
  "intent": {
    "title": "Human context resolves ambiguity.",
    "caption": "Gemma-4-31B input ablations without history. Scores are percentages.",
    "headers": [
      "Input condition",
      "Slot F1 ↑",
      "Location ↑",
      "Plan EM ↑",
      "RV F1 ↑"
    ],
    "rows": [
      [
        "Textual instruction only",
        "59.52",
        "20.47",
        "30.27",
        "N/A"
      ],
      [
        "Robot view only",
        "71.22",
        "54.86",
        "63.51",
        "60.33"
      ],
      [
        "Human + robot",
        "74.85",
        "71.13",
        "72.43",
        "57.71"
      ],
      [
        "Human + robot + center prior",
        "74.91",
        "71.39",
        "75.14",
        "61.61"
      ],
      [
        "Human + robot + gaze (full)",
        "77.18",
        "77.69",
        "78.11",
        "64.09"
      ]
    ],
    "chartLabel": "SLOT F1 (%) · HIGHER IS BETTER",
    "chartCol": 1,
    "featured": [
      4
    ],
    "note": "Table 2. Measured gaze yields the highest grounding, plan and visibility scores for Gemma-4-31B."
  },
  "history": {
    "title": "Earlier interactions carry meaning.",
    "caption": "Gemma-4-31B with full multimodal context. Scores are percentages.",
    "headers": [
      "History condition",
      "Slot F1 ↑",
      "Location ↑",
      "Plan EM ↑",
      "RV F1 ↑"
    ],
    "rows": [
      [
        "Ground-truth history (oracle)",
        "81.25",
        "80.31",
        "82.70",
        "64.88"
      ],
      [
        "No history",
        "76.69",
        "77.17",
        "76.22",
        "63.13"
      ],
      [
        "Predicted history",
        "77.89",
        "79.27",
        "81.08",
        "63.51"
      ]
    ],
    "chartLabel": "LOCATION (%) · HIGHER IS BETTER",
    "chartCol": 2,
    "featured": [
      2
    ],
    "note": "Table 3. The no-history row is a separate run from the full-input ablation. Ground-truth history is an oracle reference."
  },
  "planning": {
    "title": "Fine-tuning improves subtask progression.",
    "caption": "Temporal planning before and after fine-tuning. All planners receive annotated intent. Scores are percentages.",
    "headers": [
      "Model / setting",
      "Accuracy ↑",
      "Macro-F1 ↑",
      "Next type ↑",
      "Core ↑",
      "Completion F1 ↑"
    ],
    "rows": [
      [
        "Cosmos3-Nano · pre-trained",
        "33.07",
        "21.03",
        "0.00",
        "0.00",
        "0.00"
      ],
      [
        "Cosmos3-Nano · fine-tuned",
        "68.90",
        "70.81",
        "54.87",
        "44.25",
        "32.32"
      ],
      [
        "Qwen3.5-4B · pre-trained",
        "46.85",
        "45.71",
        "49.56",
        "32.74",
        "26.61"
      ],
      [
        "Qwen3.5-4B · fine-tuned",
        "83.46",
        "84.33",
        "75.22",
        "61.06",
        "36.85"
      ],
      [
        "Gemma-4-E4B-it · pre-trained",
        "38.58",
        "33.48",
        "23.01",
        "19.47",
        "11.30"
      ],
      [
        "Gemma-4-E4B-it · fine-tuned",
        "63.39",
        "65.63",
        "53.98",
        "38.05",
        "27.35"
      ]
    ],
    "chartLabel": "CORE (%) · HIGHER IS BETTER",
    "chartCol": 4,
    "featured": [
      1,
      3,
      5
    ],
    "note": "Table 4. Next Type, Core and Completion F1 cover all reference Switch decisions. Incorrect decisions or next types score zero. Core and Completion F1 use blinded binary review and one-to-one terminal-state fact matching."
  },
  "navigation": {
    "title": "Adaptation matters for navigation.",
    "caption": "Offline VLN action prediction with English subgoals. Scores are percentages.",
    "headers": [
      "Model / weights",
      "Accuracy ↑",
      "Macro-F1 ↑",
      "STOP recall ↑",
      "STOP F1 ↑"
    ],
    "rows": [
      [
        "NaVid · original",
        "48.74",
        "45.38",
        "53.49",
        "30.95"
      ],
      [
        "NaVid · fine-tuned",
        "86.59",
        "86.15",
        "80.72",
        "60.05"
      ],
      [
        "StreamVLN · original",
        "46.84",
        "39.65",
        "19.39",
        "20.34"
      ],
      [
        "StreamVLN · fine-tuned",
        "86.36",
        "86.20",
        "75.49",
        "67.02"
      ],
      [
        "InternVLA-N1 · original",
        "49.08",
        "45.41",
        "58.28",
        "31.48"
      ],
      [
        "InternVLA-N1 · fine-tuned",
        "90.69",
        "91.00",
        "84.53",
        "76.98"
      ]
    ],
    "chartLabel": "ACCURACY (%) · HIGHER IS BETTER",
    "chartCol": 1,
    "featured": [
      1,
      3,
      5
    ],
    "note": "Table 5. Fine-tuned checkpoints are selected on validation. STOP scores are annotation-bounded proxies; offline accuracy differs from real-robot success."
  },
  "manipulation": {
    "title": "Compare actions, not just outcomes.",
    "caption": "Fine-tuned VLA/WAM models with ground-truth subgoal instructions. Errors are lower-is-better.",
    "headers": [
      "Model",
      "First MSE (rad²) ↓",
      "First pos. (cm) ↓",
      "First rot. (°) ↓",
      "Chunk MSE (rad²) ↓",
      "Chunk pos. (cm) ↓",
      "Chunk rot. (°) ↓"
    ],
    "rows": [
      [
        "DreamZero",
        "0.002809",
        "1.489",
        "3.455",
        "0.013215",
        "2.604",
        "5.244"
      ],
      [
        "π0-FAST",
        "0.001644",
        "0.808",
        "1.093",
        "0.009090",
        "1.466",
        "1.858"
      ],
      [
        "π0",
        "0.000588",
        "0.396",
        "0.653",
        "0.003688",
        "0.937",
        "1.499"
      ],
      [
        "π0.5",
        "0.000468",
        "0.373",
        "0.652",
        "0.003398",
        "0.911",
        "1.519"
      ],
      [
        "FastWAM",
        "0.000374",
        "0.369",
        "0.673",
        "0.002921",
        "0.806",
        "1.327"
      ],
      [
        "Lingbot-VLA2",
        "0.000316",
        "0.310",
        "0.539",
        "0.002633",
        "0.725",
        "1.194"
      ]
    ],
    "chartLabel": "24-STEP CHUNK POSITION ERROR (CM) · LOWER IS BETTER",
    "chartCol": 5,
    "featured": [
      5
    ],
    "note": "Table 6. First-output and 24-step action-chunk errors use recorded action targets. Position is in cm, rotation in degrees and joint MSE in rad².",
    "chartMax": 3
  },
  "initial": {
    "title": "Human-centric intent helps the first decision.",
    "caption": "Qwen3.5-4B initial-subtask planning with different intent sources. Scores are percentages.",
    "headers": [
      "Intent source",
      "Next type ↑",
      "Core ↑",
      "Completion F1 ↑"
    ],
    "rows": [
      [
        "Ground-truth intent (oracle)",
        "89.00",
        "65.00",
        "42.79"
      ],
      [
        "Predicted intent (full)",
        "87.00",
        "56.00",
        "42.73"
      ],
      [
        "Predicted intent (robot-only)",
        "84.00",
        "47.00",
        "39.51"
      ],
      [
        "No intent (instruction + robot view)",
        "83.00",
        "40.00",
        "39.85"
      ]
    ],
    "chartLabel": "CORE (%) · HIGHER IS BETTER",
    "chartCol": 2,
    "featured": [
      1
    ],
    "note": "Appendix E.3. First decisions only, with no active subtask or completed-subtask history. Predicted intents are from Qwen3.8-27B. These scores are separate from the temporal planning evaluation."
  },
  "otherIntent": {
    "title": "Input context across four model families.",
    "caption": "Additional intent models: input ablations without history. Scores are percentages.",
    "headers": [
      "Model / input",
      "Slot F1 ↑",
      "Location ↑",
      "Plan EM ↑",
      "RV F1 ↑"
    ],
    "rows": [
      [
        "Qwen3.8-27B · Textual instruction only",
        "60.18",
        "22.05",
        "29.19",
        "N/A"
      ],
      [
        "Qwen3.8-27B · Robot view only",
        "71.83",
        "54.33",
        "54.05",
        "61.23"
      ],
      [
        "Qwen3.8-27B · Human + robot",
        "74.24",
        "62.47",
        "64.86",
        "60.68"
      ],
      [
        "Qwen3.8-27B · Human + robot + center prior",
        "75.21",
        "66.93",
        "68.11",
        "62.72"
      ],
      [
        "Qwen3.8-27B · Human + robot + gaze (full)",
        "77.01",
        "73.49",
        "71.08",
        "63.38"
      ],
      [
        "Muse-Glimmer-30B · Textual instruction only",
        "56.52",
        "18.64",
        "26.22",
        "N/A"
      ],
      [
        "Muse-Glimmer-30B · Robot view only",
        "67.80",
        "50.66",
        "44.86",
        "62.76"
      ],
      [
        "Muse-Glimmer-30B · Human + robot",
        "72.87",
        "62.99",
        "43.24",
        "58.78"
      ],
      [
        "Muse-Glimmer-30B · Human + robot + center prior",
        "72.57",
        "65.88",
        "44.86",
        "59.34"
      ],
      [
        "Muse-Glimmer-30B · Human + robot + gaze (full)",
        "74.86",
        "75.07",
        "43.78",
        "60.29"
      ],
      [
        "InternVL3.5-38B · Textual instruction only",
        "54.28",
        "30.45",
        "32.16",
        "N/A"
      ],
      [
        "InternVL3.5-38B · Robot view only",
        "61.34",
        "43.04",
        "25.68",
        "43.58"
      ],
      [
        "InternVL3.5-38B · Human + robot",
        "67.34",
        "56.17",
        "29.73",
        "41.95"
      ],
      [
        "InternVL3.5-38B · Human + robot + center prior",
        "66.00",
        "56.96",
        "27.03",
        "41.39"
      ],
      [
        "InternVL3.5-38B · Human + robot + gaze (full)",
        "67.99",
        "58.79",
        "28.38",
        "41.08"
      ]
    ],
    "chartLabel": "SLOT F1 (%) · HIGHER IS BETTER",
    "chartCol": 1,
    "featured": [
      4,
      9,
      14
    ],
    "note": "Appendix: additional intent models. Full context improves grounding, while plan and visibility trends vary by model."
  },
  "otherHistory": {
    "title": "Interaction history across model families.",
    "caption": "Additional intent models with full multimodal context. Scores are percentages.",
    "headers": [
      "Model / history",
      "Slot F1 ↑",
      "Location ↑",
      "Plan EM ↑",
      "RV F1 ↑"
    ],
    "rows": [
      [
        "Qwen3.8-27B · ground-truth history (oracle)",
        "81.25",
        "79.53",
        "76.76",
        "65.19"
      ],
      [
        "Qwen3.8-27B · no history",
        "76.85",
        "73.23",
        "68.92",
        "63.25"
      ],
      [
        "Qwen3.8-27B · predicted history",
        "78.43",
        "76.38",
        "69.19",
        "64.36"
      ],
      [
        "Muse-Glimmer-30B · ground-truth history (oracle)",
        "79.13",
        "77.69",
        "58.38",
        "65.87"
      ],
      [
        "Muse-Glimmer-30B · no history",
        "74.97",
        "74.54",
        "48.38",
        "60.81"
      ],
      [
        "Muse-Glimmer-30B · predicted history",
        "75.25",
        "76.12",
        "45.41",
        "62.31"
      ],
      [
        "InternVL3.5-38B · ground-truth history (oracle)",
        "71.36",
        "64.04",
        "33.78",
        "45.54"
      ],
      [
        "InternVL3.5-38B · no history",
        "66.99",
        "57.74",
        "29.46",
        "40.75"
      ],
      [
        "InternVL3.5-38B · predicted history",
        "67.34",
        "58.79",
        "28.11",
        "43.07"
      ]
    ],
    "chartLabel": "SLOT F1 (%) · HIGHER IS BETTER",
    "chartCol": 1,
    "featured": [
      2,
      5,
      8
    ],
    "note": "Appendix: additional history results. Ground-truth history is an oracle; no-history rows are separate runs from the ablation full-input rows."
  }
};
function el(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node}
function setTask(key){const data=tasks[key];document.querySelectorAll('[data-task]').forEach(tab=>{const active=tab.dataset.task===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});document.querySelector('#task-panel').setAttribute('aria-labelledby','task-tab-'+key);for(const field of ['kicker','title','description','metrics'])document.querySelector('#task-'+field).textContent=data[field];document.querySelector('#example-label').textContent=data.label;document.querySelector('#task-example-content').replaceChildren(...data.examples.map(([label,value])=>{const div=el('div');div.append(el('span',label),el('strong',value));return div}))}
const taskTabs=[...document.querySelectorAll('[data-task]')];taskTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>setTask(tab.dataset.task));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%taskTabs.length;else if(event.key==='ArrowLeft')next=(index+taskTabs.length-1)%taskTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=taskTabs.length-1;else return;event.preventDefault();taskTabs[next].focus();setTask(taskTabs[next].dataset.task)})});
function renderResults(key){const data=resultSets[key];document.querySelector('#results-title').textContent=data.title;document.querySelector('#results-note').textContent=data.note;const table=document.querySelector('#results-table');const caption=el('caption',data.caption),head=el('thead'),headrow=el('tr'),body=el('tbody');data.headers.forEach(value=>{const th=el('th',value);th.scope='col';headrow.append(th)});head.append(headrow);data.rows.forEach((row,index)=>{const tr=el('tr',undefined,data.featured.includes(index)?'highlight-row':'');row.forEach((value,col)=>{const cell=el(col===0?'th':'td',value);if(col===0)cell.scope='row';tr.append(cell)});body.append(tr)});table.replaceChildren(caption,head,body);const chart=document.querySelector('#results-chart');chart.setAttribute('aria-label',data.chartLabel);chart.replaceChildren(el('div',data.chartLabel,'chart-label'),...data.rows.map((row,index)=>{const div=el('div',undefined,'chart-row'+(data.featured.includes(index)?' featured':''));const track=el('div',undefined,'bar-track'),bar=el('i');bar.style.width=Math.min(100,Number(row[data.chartCol])/(data.chartMax||100)*100)+'%';track.setAttribute('aria-hidden','true');track.append(bar);div.append(el('span',row[0]),track,el('strong',row[data.chartCol]));return div}))}
document.querySelector('#results-select').addEventListener('change',event=>renderResults(event.target.value));renderResults('intent');
const dialog=document.querySelector('#figure-dialog');document.querySelectorAll('.hero-scene>img,.wide-figure img').forEach(image=>{const button=el('button');button.type='button';button.className='figure-zoom';button.setAttribute('aria-label','Enlarge '+image.alt);image.parentNode.insertBefore(button,image);button.append(image);button.addEventListener('click',()=>{const expanded=document.querySelector('#enlarged-figure');expanded.src=image.src;expanded.alt=image.alt;dialog.showModal()})});document.querySelector('#close-figure').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()}});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))})},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('section[id]').forEach(section=>observer.observe(section));
