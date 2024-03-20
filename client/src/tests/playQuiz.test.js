/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
 import "@testing-library/jest-dom";
 import { render, screen, fireEvent} from "@testing-library/react";
 import userEvent from "@testing-library/user-event";
 /**
  * Import all the related component(s) here:
  * 
  * 
  */
 import Convert from "../components/Convert"
 
 /**
  * we will test the conversion section that contains: currency code & amount input fields, 
  *   Convert button and converted amount text. 
  * You need to do write one unit test that ensure the functionality of the section is working as intended.
  * We need to test that the user will be able to type into the input fields then click the Convert button.
  * Once the button is clicked, the conversion amount should be displayed on the screen.
  */
 
 
 test('Testing conversion section', async () => {
     // convertCurrency is a mock function now
     const convertCurrency = jest.fn();
     const user = userEvent.setup();
     render(<Convert />);
 
    // Type values into input fields
     const fromInput = screen.getByPlaceholderText('Currency Code From');
     const amountInput = screen.getByPlaceholderText('Amount');
     const toInput = screen.getByPlaceholderText('Currency Code To');
     const convertButton = screen.getByRole('button', { name: 'Convert' });
     
 
     // insert value to inputs 
     await user.type(fromInput, 'USD');
     await user.type(amountInput, '100');
     await user.type(toInput, 'CAD');
 
     // user click the button
     await user.click(convertButton);
     // user.click(convertButton).then(()=>{
     //     const convertedAmount = screen.findByText("78");
     //     console.log(convertedAmount.textContent);
     //     expect(Number(convertedAmount.textContent)).toBe();
     // });
     
     // check if output match desired amount
     const convertedAmount = await screen.findByText("78");
     console.log(convertedAmount);
     console.log(convertedAmount.textContent);
     expect(Number(convertedAmount.textContent)).toBe(78);
 
     // screen.findByText("78").then( convertedAmount =>{
     //     console.log(convertedAmount.textContent);
     //     expect(Number(convertedAmount.textContent)).toBe(78);
     // });
     // console.log(convertedAmount.textContent);
     // expect(Number(convertedAmount.textContent)).toBe(78);
 
 
 });
 
 
 