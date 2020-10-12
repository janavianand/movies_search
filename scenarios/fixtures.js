import { Selector,ClientFunction } from 'testcafe';

const KEYWORD_1 = 'the';
const KEYWORD_2 = 'lord';
const KEYWORD_3 = 'the lord of the rings'
const URL = 'http://localhost:3000/search/movies'
const QUERY_URL = 'http://localhost:3000/search/movies?qs='

const getURL = ClientFunction(() => window.location.href);

const extractCurrPageNo = (text)=>{
    return text.split(' ')[1]
}

fixture `launch app`
    .page `${URL}`;

test('Searching movies -  with valid keyword renders movies', async t => {
   const searchInput = Selector("[data-testid='searchInput']")
   const movieCard = Selector("[data-testid='movieCard']")
   const showMoreButton = Selector("[data-testid='showMoreButton']")
   const totalResult = Selector("[data-testid='total']")

   await t.expect(movieCard.exists).notOk();
   await t.expect(showMoreButton.exists).notOk();
   await t.expect(totalResult.exists).notOk();

   await t.click(searchInput)
   await t.typeText(searchInput,KEYWORD_1)
   await t.wait(5000)

   await t.expect(movieCard.exists).ok();
   await t.expect(showMoreButton.exists).ok();
   await t.expect(totalResult.exists).ok();
   await t.expect(totalResult.textContent).contains('Showing 20 movies of total');
});

test('Searching movies - show more button fetches new result', async t => {
    const searchInput = Selector("[data-testid='searchInput']")
    const showMoreButton = Selector("[data-testid='showMoreButton']")
    const totalResult = Selector("[data-testid='total']")

    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_1)
    await t.wait(5000)

    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 20 movies of total');

    await t.click(showMoreButton);
    await t.wait(5000);
    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 40 movies of total');
 });

test('Searching movies - show more button is displayed if all results are fetched', async t => {
    const searchInput = Selector("[data-testid='searchInput']")
    const showMoreButton = Selector("[data-testid='showMoreButton']")
    const totalResult = Selector("[data-testid='total']")

    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_3)
    await t.wait(5000)

    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();

    const totalResultText = await totalResult.textContent
    const pageNo = extractCurrPageNo(totalResultText)

    await t.click(showMoreButton);
    await t.wait(5000);
    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();

    const updatedTotalResultText = await totalResult.textContent
    const updatedPageNo = extractCurrPageNo(updatedTotalResultText)

    await t.expect(updatedPageNo).eql(pageNo);
});

test('Searching movies - fetches movies with different keyword', async t => {
    const searchInput = Selector("[data-testid='searchInput']")
    const showMoreButton = Selector("[data-testid='showMoreButton']")
    const totalResult = Selector("[data-testid='total']")

    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_1)
    await t.wait(5000)

    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 20 movies of total');

    await t.click(showMoreButton);
    await t.wait(5000);
    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 40 movies of total');

    await t.click(searchInput)
    await t.typeText(searchInput,' '+KEYWORD_2)
    await t.wait(7000)

    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 20 movies of total');
});

test('Searching movies - should not reset input field when pressed enter', async t => {
    const searchInput = Selector("[data-testid='searchInput']")
    const showMoreButton = Selector("[data-testid='showMoreButton']")
    const totalResult = Selector("[data-testid='total']")

    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_1)
    await t.pressKey('enter')
    await t.wait(5000)

    await t.expect(showMoreButton.exists).ok();
    await t.expect(totalResult.exists).ok();
    await t.expect(totalResult.textContent).contains('Showing 20 movies of total');
 });


 test('Searching movies - updates URL', async t => {
    const searchInput = Selector("[data-testid='searchInput']")

    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_1)
    await t.wait(5000)

    await t.expect(getURL()).eql(`${QUERY_URL}${KEYWORD_1}`)

    await t.click(searchInput)
    await t.click(searchInput)
    await t.typeText(searchInput,KEYWORD_2)
    await t.wait(7000)

    await t.expect(getURL()).eql(`${QUERY_URL}${KEYWORD_1}${KEYWORD_2}`)
 });

fixture `launch app with query string`
    .page `${QUERY_URL}${KEYWORD_1}`;

test('loads page wit query string as input', async t =>{
    const searchInput = Selector("#outlined-search")

    await t.wait(2000)
    await t.click(searchInput)
    await t.expect(searchInput.value).eql(KEYWORD_1)
})
