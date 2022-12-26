const fs = require('fs'); 
    prompt = require('prompt-sync')(); // NO LET OR CONST TO MAKE IT GLOBAL

const { exit } = require('process');
const { fileURLToPath } = require('url');
const { isUndefined } = require('util');
// ---------------------------------------- //
function createUser(){
    const data = fs.readFileSync('newcus_data.txt',{encoding:'utf8'});
    try{
      IND = String(data.match(/\n/gm).length)  // no let or const because i want ind to be GLOBAL.
    }
    catch{
        IND = '0'; // no let or const because i want ind to be GLOBAL.
    }
    
    let userarry = [IND]

    while (1) { //creating a username
        let name = prompt('Your name(1-20 characters):')
        console.log('name:' + name)
        if (name.length < 1 | name.length > 20){
            console.log('Name must be 1-20 characters long.');
            continue;
        } //if namelength

        if (name.search(/[!'^+%&/()=.:,;_?*0-9]/g)!=-1){
            console.log('Your name cannot contain any punctuations or numbers!!');
            continue;
        } //if punct in name

        nameRE = new RegExp(name,'i');
        if (data.search(nameRE) != -1){
            console.log('This user already exists!')
            continue;
        } //if data search nameRE
        userarry.push(name);
        break
    }
    
    while(1){ //creating a password
        let p = prompt('Password(4-16characters, at least one punc,letter and a number.):')
        if (p.length > 16 | p.length < 4){
            console.log('Password must be 4-16 chars long!');
            continue
        }
        let punc_test,num_test,ltr_test=false;
    for (char in p){
        if (p[char].search(/[!'^+%&/()=.:,;_?*-]/)!=-1) punc_test = true
        if (p[char].search(/[0-9]/)!=-1) num_test = true;
        if (p[char].length === 1 && p[char].match(/[a-z]/i)) ltr_test = true;
    } //for char in p
    console.log('Test begins..');
    if (punc_test && num_test && ltr_test){
      userarry.push(p)
      break
    }
    else{
        if(!punc_test) console.log('Please use at least of these punctuations: ' + "!'^+%&/()=.:,;_?*");
        if(!num_test) console.log('Please use numbers!');
        if(!ltr_test) console.log('Please use letters!');
    }
}
while(1){ //creating an email
    let em = prompt('E-mail:').toLowerCase();

    if (em.search(/@/)==-1){
        console.log('Your e-mail must contain "@" in it!!')
        continue;
    } // if emsearch @

    if (em.slice(-7)!= '.edu.tr' && em.slice(-4)!='.com'){
        console.log("Your email's domain must be '.com' or '.edu.tr' !! ")
        continue;
    } //if emslice com edu.tr

    emRE = new RegExp(em);
    if (data.search(emRE) != -1){
        console.log('This email already exists!')
        continue;
    } //if data search emre
    userarry.push(em+'\n')
    break
    } //email while

    fs.appendFileSync("newcus_data.txt",userarry.join(','));
} //create_usr


function inputexpg(inputType,indx){
    let inpt = prompt(`How much ${inputType} you'd like to input?`)
    if(inpt.length == 0) {
        console.log("Don't leave it blank!")
        inputexpg(inputType)
        operations(indx);
    }
    if(isNaN(Number(inpt))){
        console.log('Please only use numbers!')
        inputexpg(inputType)
        operations(indx);
    } //if isnan

    const dateobj = new Date();
const datenow = Date.now();
function dayConverter(dayind){
    switch (dayind){
        case 0:
            return 'Sunday'
            break;
        case 1:
            return 'Monday'
            break;
        case 2:
            return 'Tuesday'
            break;
        case 3:
            return 'Wednesday'
            break;
        case 4:
            return 'Thursday'
            break;
        case 5:
            return 'Friday'
            break;
        default:
            return 'Saturday'
            break;
    } //switch dayind
} //dayConverter

function convertMonths(m){
    switch(m){
        case '0':
            return 'January'
            break;
        case '1':
            return 'February'
            break;
        case '2':
            return 'March'
            break;
        case '3':
            return 'April'
            break;
        case '4':
            return 'May'
            break;
        case '5':
            return 'June'
            break;
        case '6':
            return 'July'
            break;
        case '7':
            return 'August'
            break;
        case '8':
            return 'September'
            break;
        case '9':
            return 'October'
            break;
        case '10':
            return 'November'
            break;
        default:
            return 'December'
            break;
    } //switch m
} //function convertmonths

    fs.appendFileSync(indx+'_datas.txt',(inputType+',' + inpt+`,${dayConverter(String(dateobj.getDay(datenow))) +
         '-'  + String(dateobj.getDate(datenow))  + '-'  + convertMonths(dateobj.getMonth(datenow)) +  '-' + 
          dateobj.getFullYear(datenow)}\n`))

} //function inputexpg

function checkexpg(indx,isAnalysis){
    try {
        userReport = String(fs.readFileSync((indx+'_datas.txt'))).split('\n'); //no const used because i need it to be global.
    }
    catch (ENONENT){
        console.log("**********************************************************************************************\n"+
         "*We couldn't find any records matching your ID. Please input gains or expenses and try again!*\n"+
         "**********************************************************************************************");
        return '';
    } //catch
    userReport.length -= 1 
    let monthExpenses = {};
    let monthGains = {};
    let dayExpenses = {};
    let dayGains = {};
    let yearExpenses = {};
    let yearGains = {};
    let expensetotal = 0;
    let gainstotal = 0;

    if (!isAnalysis) console.log("                  LOGS");
    for(let line of userReport){
        linesplitted = line.split(',');
        datesplitted = linesplitted[2].split('-')
        if(line[0] == 'E') {        
            if (!isAnalysis) console.log(`----------------------------------------\n|| ${linesplitted[1]} spent in ${linesplitted[2]} ||`)   
            expensetotal+=Number(linesplitted[1])

            if (isNaN(Number(monthExpenses[datesplitted[2]])))  monthExpenses[datesplitted[2]] = 0 ;
            monthExpenses[datesplitted[2]] += Number(linesplitted[1])

            if (isNaN(Number(dayExpenses[datesplitted[0]])))  dayExpenses[datesplitted[0]] = 0 ; 
            dayExpenses[datesplitted[0]] += Number(linesplitted[1])

            if (isNaN(Number(yearExpenses[datesplitted[3]])))  yearExpenses[datesplitted[3]] = 0 ; 
            yearExpenses[datesplitted[3]] += Number(linesplitted[1])
            
        } //if line0 = E
        else {
            if (!isAnalysis) console.log(`----------------------------------------\n|| ${linesplitted[1]} Gained in ${linesplitted[2]} ||`)   
            gainstotal+=Number(linesplitted[1])

            if (isNaN(Number(monthGains[datesplitted[2]])))  monthGains[datesplitted[2]] = 0 ;
            monthGains[datesplitted[2]] += Number(linesplitted[1])

            if (isNaN(Number(dayGains[datesplitted[0]])))  dayGains[datesplitted[0]] = 0 ; 
            dayGains[datesplitted[0]] += Number(linesplitted[1])

            if (isNaN(Number(yearGains[datesplitted[3]])))  yearGains[datesplitted[3]] = 0 ; 
            yearGains[datesplitted[3]] += Number(linesplitted[1])
        } //else 
    } //for line of userReport
    if (!isAnalysis){
        console.log("----------------------------------------------------\n              STATISTICS\n" + 
                                    '----------------------------------------------------')
        console.log(`|| Total Money Spent: ${expensetotal} || Total Money Gained: ${gainstotal}` +
        `||\n|             || Total Profits Made: ${gainstotal-expensetotal} ||          |` +
        '\n-------------------------------------------------------- \n                  MONTHLY STATICTICS' + 
        '\n----------------------------------------------------------')
    
        for(let mo of Object.keys(monthExpenses)){
            if (isUndefined(monthExpenses[mo])) monthExpenses[mo] = 0;
            if (isUndefined(monthGains[mo])) monthGains[mo] = 0;
            console.log(`In ${mo}, you spent ${monthExpenses[mo]} and gained ${monthGains[mo]}.` + 
            `Your total profit at ${mo} was ${monthGains[mo] + monthExpenses[mo]}\n****************************`)
        } //let mo of keys month expenses
        console.log("----------------------------------------------------\n               DAY BY DAY STATISTICS\n" + 
                                    '----------------------------------------------------')
    
        for(let day of Object.keys(dayExpenses)){
            if (isUndefined(dayExpenses[day])) dayExpenses[day] = 0;
            if (isUndefined(dayExpenses[day])) dayExpenses[day] = 0;
            console.log(`On ${day}s, you spent ${dayExpenses[day]} and gained ${dayGains[day]}.` + 
            `Your total profit at ${day} was ${dayGains[day] + dayExpenses[day]}\n****************************`)
        } //let day of dayexpens
    
        console.log("----------------------------------------------------\n                 YEARLY STATISTICS\n" + 
                                    '----------------------------------------------------')
    
        for(let yr of Object.keys(yearExpenses)){
            if (isUndefined(yearExpenses[yr])) yearExpenses[yr] = 0;
            if (isUndefined(yearExpenses[yr])) yearGains[yr] = 0;
            console.log(`On ${yr}, you spent ${yearExpenses[yr]} and gained ${yearGains[yr]}.\n` + 
            `Your total profit at ${yr} was ${yearGains[yr] + yearExpenses[yr]}\n****************************`)
        } //let yr of objec keys
    } //if isanalysis
    else{
        return [monthExpenses,monthGains,dayExpenses,dayGains,yearExpenses,yearGains,expensetotal,gainstotal]
    } //else if isanalysis
    
} //function checkexpg
function checkanalysis(indx){
    let expenseSet = checkexpg(indx,true);
    console.log("*********************")
    for(let mo of Object.keys(expenseSet[0])){
             if (isUndefined(expenseSet[0][mo])) expenseSet[0][mo] = 0;
            if (isUndefined(expenseSet[1][mo])) expenseSet[1][mo] = 0;
        if (expenseSet[0][mo] + expenseSet[1][mo] < 0) console.log(`You spent more than you gain in ${mo}, be careful!`)
        else console.log(`Your profits are great in ${mo}, keep it going!!`)
    } //per month at monthexpenses - expset0
    console.log("*********************")
let weekEnds,weekDays;
    for(let dy of Object.keys(expenseSet[2])){
        if (isUndefined(expenseSet[2][dy])) expenseSet[2][dy] = 0;
       if (isUndefined(expenseSet[3][dy])) expenseSet[3][dy] = 0;
       switch(dy){
           case 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday':
               weekDays += expenseSet[2][dy] + expenseSet[3][dy]
            default:
                weekEnds += expenseSet[2][dy] + expenseSet[3][dy]
       }

   if (expenseSet[2][dy] + expenseSet[3][dy] < 0) console.log(`You spent more than you gain in ${dy}, be careful!`)
   else console.log(`Your profits are great in ${dy}, keep it going!!`)
   if(weekDays < 0) console.log('You are on low on weekdays, how could you spent while working???')
   else console.log('Great work comes with great profit, greetings!! ')
   if(weekEnds < 0) console.log('Stop traveling around malls on weekends! ')
   else console.log('Hustle on weekends ! Keep it going!!')
} //per day expset2 expset3
    console.log("*********************")

    for(let yil of Object.keys(expenseSet[4])){
        if (isUndefined(expenseSet[4][yil])) expenseSet[4][yil] = 0;
       if (isUndefined(expenseSet[5][yil])) expenseSet[5][yil] = 0;
   if (expenseSet[4][yil] + expenseSet[5][yil] < 0) console.log(`You spent more than you gain in ${yil}, be careful!`)
   else console.log(`Your profits are great in ${yil}, keep it going!!`)
} //per year at yearexps - expset4 - expset5
    // `
    if(expenseSet[6] > expenseSet[7]){
        console.log(`You spent ${String(expenseSet[6] / expenseSet[7]).slice(0,4)} times more than you gained! Learn some money control...`);
        console.log('You can learn stocks marketing or crypto trading, or just stop buying useless thigns?')
    }
    else console.log(`You fold money like a monster! You gained ${String(expenseSet[6] / expenseSet[7]).slice(0,4)} times more than wasted!`)
    
} //function check analysis
function operations(indx){
    const userdata = fs.readFileSync('newcus_data.txt',{encoding:'utf8'}).split('\n');
    for(line of userdata){
        if(line[0]==indx){
            linesplitted = line.split(',');
            let name = linesplitted[1];
            let pw = linesplitted[2];
            let mail = linesplitted[3];

            console.log(`Welcome to app, ${name}!\n--------------------`)
        } //if line.slice
    } //for line of user data
    while (1){
    console.log('List of commands:\n -input [ expense | gain] ) \n-check [expenses | analysis]\n-help\n-quit\n-references') 
    // i didn't used console log inside prompt since it crashes when there are too many characters inside prompt-sync.
    let operation = prompt('Please enter without "-":')
    
    if (operation.search(/input/i) != -1) {
       if(operation.search(/expense/i)!= -1) inputexpg('Expense',indx);
       else if (operation.search(/gain/i) != -1) inputexpg('Gain',indx);
       else console.log('This is not a valid input form. Only use expense or gain keywords!!')
    } //if operation search input

    else if (operation.search(/check/i)!= -1){
        if(operation.search(/expenses/i) != -1) checkexpg(indx,false);
        else if (operation.search(/analysis/i) != -1) checkanalysis(indx);
        else console.log('This is not a valid check form. Only use expenses or analysis keywords!!')
    } //if operation search check

    else if (operation.search(/help/i)!= -1){
        console.log('Welcome to expense tracker.Here is a quick guide:\n 1 - Terminal allows you to run functions.' +
        "2- You can input expense or gain with using input flag with gain or expense keyword.It'll be added with a timestamp." +
        "3-You can check your expenses with check flag, using expenses keyword.\n4-analysis keyword helps you to analysis your expenses." + 
        "5-help flag will call this text.\n6-quit flag will quit.\n7-using multiple flags will led to usage of first flag." + 
        "Same applies to keywords as well.") 
    } //if help
    else if(operation.search(/quit/i)!=-1){
        exit();
    }
    else console.log(`No flags found with: ${operation} `)
    }
    
    

} //operations func
function logIn(){
    let userdatas = fs.readFileSync('newcus_data.txt',{encoding:'utf8'}).split("\n");
    userdatas.length -= 1;
    if(userdatas.length == 0) {
        console.log("No users found! You're redirecting to create your very first user!!")
        createUser()
        userdatas = fs.readFileSync('newcus_data.txt',{encoding:'utf8'}).split("\n");
        userdatas.length -= 1}
    for (udt of userdatas){
        console.log("------------------------")
        console.log(`| ${udt.split(",").slice(0,2).join(' - ')}`);
        if (userdatas.slice(-1) == udt) console.log("------------------------") 
       } //for udt of userdatas
    
    while (1){
    let lind = prompt("Enter an index you'd like to log in(create to create new!):");

        if(lind.toLowerCase() == 'create') {
            createUser();
        logIn();
        break;
        } //if lind create
        if(isNaN(lind)){
            console.log('Wrong format of index.');
            continue;
        }
    for(userline of userdatas){
        if(lind == userline[0]){
            let tries = 0;
            while(tries < 5){
                if(prompt('Password:')==userline.split(",")[2]) {
                    operations(lind);
                    break;
                } //if prompt pw 
                else {
                    console.log('Incorrect password')
                    tries += 1 }
            }
            console.log('All tries failed!! exiting from the app...')
            exit();
        } // if lind userline
    } //for userline of userdatas
    console.log(`No user found with index ${lind}`)
    

    } //while 1 
    
} //login function
logIn();