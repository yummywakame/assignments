/* 
    Write a function that returns the number of times that the string "code" 
    appears anywhere in the given string, except we'll accept any letter for 
    "d", so "cope" and "cooe" would also count.

    Return the count, including any substitutions for the letter "d".
*/
function countCode(string) {  
  return ((string || '').match(/co.e/g) || []).length
}

console.log(countCode("aaacodebbb"))
console.log(countCode("codexxcode"))
console.log(countCode("cozexxcope"))

console.log("\n")
// Output: 
// countCode("aaacodebbb") returns 1
// countCode("codexxcode") returns 2
// countCode("cozexxcope") returns 2


/* 
    Extra credit
    Allow any uppercase characters to substitute for "c"
*/
function countCode2(string) {  
    return ((string || '').match(/[A-Z,a-z]o.e/g) || []).length
}

console.log(countCode2("aaaAodebbb"))
console.log(countCode2("codexxZode"))
console.log(countCode2("cozexxcope"))