# Getting Started
### 1. Clone Repository.
``` bash
git clone https://github.com/Jorgeniuus/duckduckgo-search-frontend.git
```
### 2. Navigate to the `duckduckgo-search-frontend/duckduckgo-search-frontend` folder:
navigate into the specified directory 
``` bash 
cd ./duckduckgo-search-frontend/duckduckgo-search-frontend
```
opens vs code in current directory.
``` bash 
code .
```
### 3. Run following command to install all required dependencies such as **axios**.
``` bash
npm install
```
# Runnig the Project
Once you are inside the `duckduckgo-search-frontend/duckduckgo-search-frontend` folder, run following command to start the react application.
``` bash
npm run dev
```
The react application runs on port **5173** by default.
``` bash
http://localhost:5173/
```
# Versions
- **Vite:** 5.4.10
- **React":** 18.3.1
- **Node.js:** 20.17.0
- **npm:** 10.9.0

### Installing NVM (Node Version Manager)

 To easily manage Node.js versions on your machine, we recommend using [NVM](https://github.com/nvm-sh/nvm), a version manager for Node.js.

### Steps to install NVM:
1. **Open your terminal (Git Bash recommended for Windows)**.
2. Run the following command to download and install NVM:

   **For macOS / Linux:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
### Managing Node.js Versions with NVM

To manage Node.js versions with NVM, follow these basic commands:

1. **Install a specific version of Node.js:**

    ```bash
    nvm install 16.14.0
    ```

2. **List installed Node.js versions:**

    ```bash
    nvm ls
    ```

3. **Use a specific version of Node.js:**

    ```bash
    nvm use 14.17.6
    ```

# Project Structure
- The folders have been organized according to your functionalities.
    1. **src/services**: The API connection and requests are here to be exported to be used by another file.
    2. **src/modules**: Parts of code to be used by another file.
    3. **src/components**: All component parts to be rendered on the Home page are here.

# Features
- Search input.
- Search autocomplete.
- Display of searched content and link.
- Sidebar with history of previous searches, with redirection to the search.
- Input to **find** terms and highlight them in yellow, counting their occurrences.
- Press **Ctrl + F** to open and find terms, and **Escape** to close it.

# Project Overview
- In this React project, we can perform searches using the results from the DuckDuckGo API and revisit those searches through the previous search history in the sidebar. This application also allows us to search for keywords within the search terms via a search bar that we can open by pressing the **Ctrl + F** key. Then, we type terms in it to be found within the body of our search. To close this bar, we use the **Escape** key. 
