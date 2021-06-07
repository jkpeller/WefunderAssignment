import React from 'react';
import { FileUploader } from 'carbon-components-react';
import { settings } from 'carbon-components';
import {
  array,
  boolean,
  select,
  text,
} from '@storybook/addon-knobs';

const { prefix } = settings;

const divStyle = {
  padding: '3em',
};

const sizes = {
  'Compat check - Field': 'field',
  'Compat check - Small': 'small',
  'Compat check - default': 'default',
  'Small  (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg) - Default': 'lg',
};

const filenameStatuses = {
  'Edit (edit)': 'edit',
  'Complete (complete)': 'complete',
  'Uploading (uploading)': 'uploading',
};

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = React.useState();

  async function postFile(fileToUpload) {
    const formData = new FormData();

    formData.append('fileName', fileToUpload.name);
		formData.append('file', fileToUpload);
    console.log(fileToUpload);

    const response = await fetch(`api/file`,
    {
      method: 'POST',
      body: formData
    });
    return response.json();
			// .then((response) => response.json())
			// .then((result) => {
			// 	console.log('Success:', result);
			// })
			// .catch((error) => {
			// 	console.error('Error:', error);
			// });
  }

  const clickHandler = (evt) => {
    console.log("Hi");
  };

  const changeHandler = (evt) => {
    console.log("onChange is triggered");
    setSelectedFile(evt.target.files[0]);
    console.log(evt);
    console.log(selectedFile);
    postFile(evt.target.files[0]);
	};

  const fileUploader = () => {
    const buttonKind = select(
      'Button kind (buttonKind)',
      {
        'Primary (primary)': 'primary',
        'Tertiary (tertiary)': 'tertiary',
      },
      ''
    );
    return {
      labelTitle: text('The label title (labelTitle)', 'Upload files'),
      labelDescription: text(
        'The label description (labelDescription)',
        'Max file size is 500mb. Only .pdf files are supported.'
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Add Pitch Deck'),
      buttonKind: buttonKind || 'primary',
      size: select('Button size (size)', sizes, 'default'),
      filenameStatus: select(
        'Status for file name (filenameStatus)',
        filenameStatuses,
        'edit'
      ),
      accept: array('Accepted file extensions (accept)', ['.pdf'], ','),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', false),
      iconDescription: text(
        'Close button icon description (iconDescription)',
        'Clear file'
      ),
      onChange: changeHandler,
      onClick: clickHandler,
      onDelete: () => { console.log("onDelete is triggered") },
    };
  };

  return (
    <div className={`${prefix}--file__container`} style={divStyle}>
      {/* <SlideShow data={data} /> */}
      <FileUploader {...fileUploader()} />
    </div>
  )
};

export default UploadPage;