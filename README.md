## ChatGPT Fine-Tune Client

ChatGPT Fine-Tune Client is an open-source web application that allows users to interact with a fine-tuned version of the ChatGPT language model. The application is built with Next.js, Tailwind CSS, and Ant Design (antd).

### Getting Started

Follow these steps to run the project locally on your machine:

1. **Copy .env.example to .env**

In the root of the project, find the .env.example file. Duplicate this file and rename it to .env. The .env file is used to set up environment variables for the application.

2. **Install Dependencies**

Open your terminal or command prompt, navigate to the project's root directory, and run the following command to install the required dependencies:

```sh
npm install
```

3. **Run the Application**

Once the dependencies are installed, start the development server by running the following command:

```sh
npm run dev
```

The application will now be running locally at http://localhost:3000.

4. **Add and Edit Sample**

On the application's homepage (http://localhost:3000), click on the "Add" button to create a new fine-tuning sample. You can download the provided sample, make any necessary edits, and save it.

5. **Upload the Sample**

After editing the sample, return to the application and upload the edited file using the provided upload functionality.

6. **Fine-Tune the Model**

Once the sample is uploaded, click on the "Fine Tune" button to start the fine-tuning process using the uploaded sample. The application will utilize the fine-tuned model to generate more accurate and contextually relevant responses based on the uploaded data.

7. **Check Fine-tune Status**

Check the progress by clicking on the "View" button. Once the `Message` shows "Job succeeded," the "Fine-Tuned Model" section will appear. Use this fine-tuned model for the completion API and integrate it into your own chatbot. Enjoy the enhanced capabilities!


### License

This project is licensed under the [MIT License](LICENSE).

### Contributing

Contributions to the ChatGPT Fine-Tune Client project are welcome. If you encounter any issues or have ideas for improvements, please feel free to submit pull requests.
