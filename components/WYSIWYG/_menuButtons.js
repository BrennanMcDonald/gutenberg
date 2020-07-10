import {
    faBold,
    faItalic,
    faLink,
    faCode,
    faListOl,
    faListUl,
    faRemoveFormat,
  } from '@fortawesome/free-solid-svg-icons'

const safeExecute = (command, html = false, option = "") => {
    let result = document.execCommand(command, html, option);
    if (!result){
        alert(`Failed to execute ${command}`);
    }
}

export default [
    {
        icon: faBold,
        command: () => {
            safeExecute('bold');
        },
    },
    {
        icon: faItalic,
        command: () => {
            safeExecute('italic');
        },
    },
    {
        icon: faListOl,
        command: () => {
            safeExecute('insertOrderedList');
        },
    },
    {
        icon: faListUl,
        command: () => {
            safeExecute('insertUnorderedList');
        },
    },
    {
        text: '—',
        command: () => {
            safeExecute('insertHorizontalRule');
        },
    },
    {
        icon: faLink,
        command: () => {
            let url = window.prompt('Add Link Url', 'https://google.com') || ''
            let success = safeExecute('createLink', false, url)
            if (!success) {
                alert('failed')
            }
        },
    },
    {
        icon: faCode,
        command: () => {
            safeExecute('formatBlock', null, '<pre>');
        },
    },
    [
        {
            text: "Heading 1",
            command: () => {
                safeExecute('heading', false, "H1");
            },
        },
        {
            text: "Heading 2",
            command: () => {
                safeExecute('heading', false, "H2");
            },
        },
        {
            text: "Heading 3",
            command: () => {
                safeExecute('heading', false, "H3");
            },
        },
        {
            text: "Heading 4",
            command: () => {
                safeExecute('heading', false, "H4");
            },
        },
        {
            text: "Heading 5",
            command: () => {
                safeExecute('heading', false, "H5");
            },
        },
        {
            text: "Heading 6",
            command: () => {
                safeExecute('heading', false, "H6");
            },
        }
    ],
    {
        icon: faRemoveFormat,
        command: () => {
            safeExecute('formatBlock', null, '<p>');
        },
    },
]