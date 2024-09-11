let testArray = [
    "'I'm the cook,' he said, 'it's my job.'",
    "'Is there anything you can fancy that you would like to eat?' I once said to an old labouring man, who was in his last illness, and who had refused all the food his wife had offered him.",
    "'No,' he answered, 'I've never been used to nothing but common victual, and I can't eat that.' Experience had bred no fancies in him that could raise the phantasm of appetite.",
    "...they had, perhaps, heard their fathers and mothers hint that Silas Marner could cure folks' rheumatism if he had a mind...",
    "...and his advent from an unknown region called 'North'ard'",
    "'and p'rhaps you aren't pig-headed; and p'rhaps you didn't say the cow was a red Durham; and p'rhaps you didn't say she'd got a star on her brow—stick to that, now you're at it.'"
];

for (quote in testArray) {
    console.log(testArray[quote].replace(/(([^\w]|^)'(\w|\s|.))|(([^])'([^\w]|$))/g, "$2$5\"$3$6"));
}

// Output:
// "I'm the cook," he said, "it's my job."
// "Is there anything you can fancy that you would like to eat?" I once said to an old labouring man, who was in his last illness, and who had refused all the food his wife had offered him.
// "No," he answered, "I've never been used to nothing but common victual, and I can't eat that." Experience had bred no fancies in him that could raise the phantasm of appetite.
// ...they had, perhaps, heard their fathers and mothers hint that Silas Marner could cure folks" rheumatism if he had a mind...
// ...and his advent from an unknown region called "North'ard"
// "and p'rhaps you aren't pig-headed; and p'rhaps you didn't say the cow was a red Durham; and p'rhaps you didn't say she'd got a star on her brow—stick to that, now you're at it."
