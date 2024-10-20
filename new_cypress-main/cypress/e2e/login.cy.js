import * as data from "../helpers/default_data.json"

import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); //Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css','color','rgb(0, 85, 152)'); // Проверяю цвет кнопки восттановить
          });
          
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
           });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); //Ввели верный логин
         cy.get(main_page.password).type(data.password); // Ввелли верный пароль
         cy.get(main_page.login_button).click(); // нажал кнопку войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); //Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввелли неверный пароль
        cy.get(main_page.login_button).click(); // нажал кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю   
    })

    it('Проверка что логине есть @ ', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); //Ввел логин без "@"
        cy.get(main_page.password).type(data.password); // Ввелли верный пароль
        cy.get(main_page.login_button).click(); // нажал кнопку войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю    
    })

    it('Проверка восстановления пароля', function () {
        
        cy.get(main_page.fogot_pass_btn).click(); // нажимаю кнопку восстановить пароль

        cy.get(recovery_page.email).type(data.login); // ввёл почту для восстановления
        cy.get(recovery_page.send_button).click(); // Нажал отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //Проверяю, на совпадение текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })
 })

 


// План
// + Найти поле логин и ввести верный логин 
// + Найти поле пароль и ввести правильный пароль
// + Найти кнопку войти и нажать на неё 
// + Проверить, что авторизация прошла успешно    