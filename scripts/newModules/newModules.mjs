import chalk from 'chalk';      // 引入 chalk 模組，在終端機中添加顏色和樣式
import fs from 'fs';            // 引入 fs 模組，處理檔案(文件)系統相關的操作
import { resolve } from 'path'; // 引入 path 模組中的 resolve，處理文件路徑

// 更改 log 提示顏色，讓使用者可以判讀訊息狀態
const log = (message) => console.log(chalk.green(message)) 
const errorLog = (error) => console.error(chalk.red(error)) 

/*
* 生成新專案
* @param {string} inputProjectName 使用者輸入的專案名稱
* @param {string} isTs 用於判斷是否為 TypeScripts 模板
*/
const generateProject = async (inputProjectName, isTs) => {
    try {
        const targetPath = resolve('./src/modules', inputProjectName)
        const sourcePath = resolve(isTs ? './scripts/newModules/template-ts' : './scripts/newModules/template')
        
        // 判斷目標路徑是否已有同樣名稱，如有相同名稱則回傳錯誤提示
        if (fs.existsSync(targetPath)) {
            errorLog('頁面已經存在，請輸入不同名稱');
            return;
        }
        await fs.promises.mkdir(targetPath)
        await copyFiles(sourcePath, targetPath)
        log('創建成功')
    } catch (error) {
        errorLog(`錯誤：${error}`)
    }
}

// 遞歸複製模板檔案中的文件
const copyFiles = async (sourcePath, targetPath) => {
    try {
        // 同步讀取源路徑下的文件和子目錄列表，withFileTypes: true 返回 Dirent 對象
        const sourceFiles = fs.readdirSync(sourcePath, { withFileTypes: true });

        // 確保所有異步操作完成
        await Promise.all(
            // 遍歷 sourceFiles，並進行複製
            sourceFiles.map(async (file) => {
                // 獲得每一個檔案的路徑
                const newSourcePath = resolve(sourcePath, file.name);
                const newTargetPath = resolve(targetPath, file.name);

                // 如果是資料夾，創建對應 newTargetPath 的資料夾，再遞歸複製內容
                if (file.isDirectory()) {
                    await fs.promises.mkdir(newTargetPath);
                    await copyFiles(newSourcePath, newTargetPath);
                } else {
                    // 如果不是資料夾，則直接複製：注意這邊用的是 node.js 原生
                    await fs.promises.copyFile(newSourcePath, newTargetPath);
                }
                
            })
        )
    } catch (error) {
        errorLog(`複製文件時出錯：${error.message}`)
    }
};

// 輸入名稱提示
log('請輸入 "Name" 檔案名稱');
/*
* 監聽使用者輸入，當輸入完成後進行處理
* @param {string} 'data' - 表示事件名稱為 'data' 的字符串
* @param {Buffer} input 使用者輸入，需要轉換為字串
*/
process.stdin.on('data', async(input) => {
    const inputProjectName = input.toString().trim(); // 將使用者輸入轉為字串
    const projectNameRegex = /^[a-zA-Z0-9_-]*$/;      // 專案名稱驗證：只能是英數字和 '_', '-'
    const isTs = process.env.npm_config_ts;           // 判斷是否為 TypeScript 模板

    // 判斷使用者輸入格式是否正確：不正確則回傳錯誤提示
    if (!projectNameRegex.test(inputProjectName)) {
        errorLog('格式輸入錯誤，頁面名稱只能包含英文數字及 _ -');
        return
    }

    // 生成新專案 function
    await generateProject(inputProjectName, isTs)
    process.stdin.emit('end')
})

// 監聽 end 事件，當接收到 end 事件時執行"結束操作"
process.stdin.on('end', () => {
    console.log('exit...')
    process.exit()
})

