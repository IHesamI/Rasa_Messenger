import { useRef, useState } from 'react';
import { TEXT_STYLES } from './Constants';

export default function TextProcessorObj(containers) {
  const customSort = (a, b) => {
    if (a.lower != b.lower) {
      return a.lower - b.lower;
    }
    return a.upper - b.upper;
  };
  const ProcessorValues = useRef({
    sorted: containers.sort(customSort),
    caretPosition: null,
    counter: 3,
    selectedlower: 0,
    selectedupper: 0,
    selectedtext: null,
    rawtext: ''
  });
  const [openemoji, setopenemoji] = useState(false);
  const divref = useRef(null);
  const [openTextProcessor, setOpenTextProcessor] = useState(false);
  const [entitycontainers, setentitycontainers] = useState([]);

  function replaceInArray(modifiedobject) {
    const Originalindex = ProcessorValues.current.sorted.findIndex(
      (obj) => obj.id == modifiedobject.id
    );
    if (Originalindex != -1) {
      ProcessorValues.current.sorted[Originalindex] = modifiedobject;
    } else {
      ProcessorValues.current.sorted.push(modifiedobject);
    }
  }

  function Conflicts(HeadContainer, BodyContainer) {
    // console.log(HeadContainer)
    return BodyContainer.filter((obj) => findConflict(HeadContainer, obj));
  }

  function findConflict(Head, body) {
    return Head.lower <= body.lower && Head.upper >= body.lower;
  }

  function updateEnteties() {
    let charcounter = 0;
    if (divref.current.childNodes.length == 0) {
      ProcessorValues.current.sorted = [];
    }
    divref.current.childNodes.forEach((child) => {
      if (child.data) {
        charcounter += child.data.length;
      } else {
        const { id } = child.dataset;
        const newlower = charcounter;
        if (child.innerText == '\n') {
          ProcessorValues.current.sorted = ProcessorValues.current.sorted.filter(
            (obj) => obj.id != id
          );
          return;
        }
        charcounter += child.innerText.length;
        const newupper = charcounter;
        ProcessorValues.current.sorted = ProcessorValues.current.sorted.map((obj) => {
          if (obj.id == id) {
            return { ...obj, lower: newlower, upper: newupper };
          }
          return obj;
        });
      }
    });
  }

  function findcursorPos() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(divref.current);
    clonedRange.setEnd(range.endContainer, range.endOffset); // this set the position of the cursor
    return [clonedRange.toString().length, clonedRange];
  }
  function RawText() {
    let text = '';
    divref.current.childNodes.forEach((element) => {
      if (element.innerText) {
        text += element.innerText;
      } else {
        text += element.data;
      }
    });
    return text;
  }
  function handleonInput(e) {
    e.stopPropagation();
    const result = findcursorPos();
    ProcessorValues.current.caretPosition = result[0];
    // console.log(ProcessorValues.current.caretPosition);
    ProcessorValues.current.rawtext = RawText();
    updateEnteties(result[1]);
  }
  function handleKeyLeftRight(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
      ProcessorValues.current.caretPosition = findcursorPos()[0];
    }
  }

  function handleclick(e) {
    ProcessorValues.current.caretPosition = findcursorPos()[0];
  }

  function handleEmojiPicker(e) {
    const emoji = e;
    const careposition = ProcessorValues.current.caretPosition;
    ProcessorValues.current.rawtext = insertCharAtIndex(
      ProcessorValues.current.rawtext,
      emoji,
      careposition
    );
    // updateEnteties();
    const text = ProcessorValues.current.rawtext;
    const ents = ProcessorValues.current.sorted;
    const list = generateEntity(divref, text, ents);
    setentitycontainers(list);
    setopenemoji(false);
  }

  function insertCharAtIndex(originalString, charToAdd, index) {
    if (index < 0 || index > originalString.length) {
      throw new Error('Index out of bounds');
    }
    if (index == originalString.length) {
      return originalString + charToAdd;
    }
    const leftPart = originalString.substring(0, index);
    const rightPart = originalString.substring(index);
    return leftPart + charToAdd + rightPart;
  }

  function rangefun() {
    const selection = window.getSelection();
    const range = window.getSelection().getRangeAt(0);
    let { length } = selection.toString();
    if (length != 0) {
      setOpenTextProcessor(true);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(divref.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const startIndex = preSelectionRange.toString().length;
      length += startIndex - 1;
      ProcessorValues.current.selectedlower = startIndex;
      ProcessorValues.current.selectedupper = length;
      ProcessorValues.current.selectedtext = preSelectionRange.toString();
    }
  }

  function Removetheselected(selectedContainer) {
    ProcessorValues.current.sorted = ProcessorValues.current.sorted.filter(
      (obj) => obj.id != selectedContainer.id
    );
  }
  function ChnageTheContainers(HeadContainer, selectedContainer) {
    let rangeSet = new Set();
    rangeSet.add(HeadContainer.lower);
    rangeSet.add(HeadContainer.upper);
    rangeSet.add(selectedContainer.lower);
    rangeSet.add(selectedContainer.upper);
    rangeSet = [...rangeSet];
    rangeSet.sort((a, b) => a - b);
    switch (rangeSet.length) {
      case 2:
        HeadContainer.style = HeadContainer.style.concat(selectedContainer.style);
        replaceInArray(HeadContainer);
        Removetheselected(selectedContainer);
        break;
      case 3:
        if (HeadContainer.lower == selectedContainer.lower) {
          if (HeadContainer.upper > selectedContainer.upper) {
            selectedContainer.style = HeadContainer.style;
          }
          HeadContainer.lower = rangeSet[0];
          HeadContainer.upper = rangeSet[1];
          HeadContainer.style = HeadContainer.style.concat(selectedContainer.style);
          replaceInArray(HeadContainer);
          selectedContainer.lower = rangeSet[1] + 1;
          selectedContainer.upper = rangeSet[2];
          replaceInArray(selectedContainer);
        } else {
          HeadContainer.lower = rangeSet[0];
          HeadContainer.upper = rangeSet[1] - 1;
          replaceInArray(HeadContainer);
          selectedContainer.lower = rangeSet[1];
          selectedContainer.upper = rangeSet[2];
          selectedContainer.style = HeadContainer.style.concat(selectedContainer.style);
          replaceInArray(selectedContainer);
        }
        break;
      case 4:
        HeadContainer.lower = rangeSet[0];
        HeadContainer.upper = rangeSet[1] - 1;
        replaceInArray(HeadContainer);
        ProcessorValues.current.counter += 1;
        const objmiddle = {
          id: ProcessorValues.current.counter,
          lower: rangeSet[1],
          upper: rangeSet[2],
          style: HeadContainer.style.concat(selectedContainer.style)
        };
        replaceInArray(objmiddle);
        selectedContainer.lower = rangeSet[2] + 1;
        selectedContainer.upper = rangeSet[3];
        replaceInArray(selectedContainer);
        break;
    }
  }

  function ChangeEntities(choice) {
    ProcessorValues.current.counter = ProcessorValues.current.counter + 1;
    const NewEntity = {
      id: ProcessorValues.current.counter,
      lower: ProcessorValues.current.selectedlower,
      upper: ProcessorValues.current.selectedupper,
      style: [TEXT_STYLES[choice]]
    };
    ProcessorValues.current.sorted.push(NewEntity);
    ProcessorValues.current.sorted = ProcessorValues.current.sorted.sort(customSort);
    let index = 0;
    while (index < ProcessorValues.current.sorted.length) {
      const HeadContainer = ProcessorValues.current.sorted[index];
      const containersConflict = Conflicts(
        HeadContainer,
        ProcessorValues.current.sorted.slice(index + 1)
      );
      if (containersConflict.length) {
        ChnageTheContainers(HeadContainer, containersConflict[0]);
        index = 0;
      } else {
        index++;
      }
      ProcessorValues.current.sorted = ProcessorValues.current.sorted.sort(customSort);
    }
    InputEntity();
  }

  function InputEntity() {
    ProcessorValues.current.rawtext = RawText();
    const text = ProcessorValues.current.rawtext;
    const ents = ProcessorValues.current.sorted;
    const list = generateEntity(divref, text, ents);
    setentitycontainers(list);
  }

  function OutputEntity(targetref, text, ents) {
    // console.log(typeof JSON.parse(JSON.stringify(ents)));
    const list = generateEntity(targetref, text, []);
    // console.log(list);
    // setentitycontainers(list);
  }
  function generateEntity(ref, text, ents) {
    let list_of_renderableentities = [];

    if (ents.length == 0) {
      ProcessorValues.current.counter += 1;
      list_of_renderableentities.push({
        id: ProcessorValues.current.counter,
        lower: 0,
        upper: text.length - 1,
        content: text
      });
      ref.current.innerText = '';
      list_of_renderableentities.forEach((element) => {
        if (element.style) {
          const ptag = document.createElement('p');
          element.style.forEach((stl) => ptag.classList.add(stl));
          ptag.textContent = element.content;
          ref.current.appendChild(ptag);
        } else {
          ref.current.appendChild(document.createTextNode(element.content));
        }
      });
      return list_of_renderableentities;
    }
    console.log(ents);
    let prevEnd;
    for (let i = 0; i < ents.length; i++) {
      // if (ents.length == 1) {01
      //   list_of_renderableentities.push({
      //     lower: ents[0].upper + 1,
      //     upper: text.length - 1
      //   });
      //   break;
      // }
      if (i == 0 && ents[0].lower > 0) {
        list_of_renderableentities.push({
          lower: 0,
          upper: ents[0].lower - 1
        });
        prevEnd = ents[0].upper;
      }
      if (i == 0 && ents[0].lower == 0) {
        list_of_renderableentities.push({
          lower: ents[0].upper + 1,
          upper: ents.length == 1 ? text.length - 1 : ents[1].lower - 1
        });
        prevEnd = ents[0].upper;
      }

      const currentRange = ents[i];
      const gapStart = prevEnd + 1;
      const gapEnd = currentRange.lower - 1;
      if (gapStart <= gapEnd) {
        list_of_renderableentities.push({ lower: gapStart, upper: gapEnd });
      }
      prevEnd = Math.max(prevEnd, currentRange.upper);
    }
    if (prevEnd < text.length) {
      list_of_renderableentities.push({
        lower: prevEnd + 1,
        upper: text.length - 1
      });
    }
    list_of_renderableentities = list_of_renderableentities.concat(ents);
    list_of_renderableentities.sort(customSort);
    list_of_renderableentities = list_of_renderableentities.map((ent) => ({
      ...ent,
      content: text.substring(ent.lower, ent.upper + 1)
    }));

    // ProcessorValues.current.rawtext = '';
    ref.current.innerText = '';
    list_of_renderableentities.forEach((element) => {
      if (element.style) {
        const ptag = document.createElement('p');
        element.style.forEach((stl) => ptag.classList.add(stl));
        ptag.textContent = element.content;
        ref.current.appendChild(ptag);
      } else {
        ref.current.appendChild(document.createTextNode(element.content));
      }
    });

    // console.log(list_of_renderableentities);
    return list_of_renderableentities;
  }

  function handleSelect(e) {
    rangefun();
  }
  return {
    handleEmojiPicker,
    handleSelect,
    handleonInput,
    handleclick,
    openTextProcessor,
    divref,
    setOpenTextProcessor,
    entitycontainers,
    setentitycontainers,
    ChangeEntities,
    openemoji,
    setopenemoji,
    handleKeyLeftRight,
    ProcessorValues,
    OutputEntity
  };
}
