<template>
  <footer>
    <div class="columns container">
      <div class="column">
        <h5>КОМПАНИЯ</h5>
        <RouterLink to="">О нас</RouterLink>
        <RouterLink to="">Контакты</RouterLink>
      </div>
      <div class="column">
        <h5>Полезное</h5>
        <RouterLink to="">Оплата и доставка</RouterLink>
        <RouterLink to="">Условия возврата</RouterLink>
        <RouterLink to="">Бонусная система</RouterLink>
      </div>
      <div class="column">
        <h5>Покупателю</h5>
        <RouterLink to="">Избранное</RouterLink>
        <RouterLink to="">Публичная оферта</RouterLink>
        <RouterLink to="">Политика конфиденциальности</RouterLink>
      </div>
      <div class="column">
        <h5>Контакты</h5>
        <div class="social-media">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_312_757)">
              <path
                d="M9.49968 7.12492C8.86979 7.12492 8.2657 7.37514 7.8203 7.82054C7.3749 8.26594 7.12467 8.87003 7.12467 9.49992C7.12467 10.1298 7.3749 10.7339 7.8203 11.1793C8.2657 11.6247 8.86979 11.8749 9.49968 11.8749C10.1296 11.8749 10.7337 11.6247 11.1791 11.1793C11.6245 10.7339 11.8747 10.1298 11.8747 9.49992C11.8747 8.87003 11.6245 8.26594 11.1791 7.82054C10.7337 7.37514 10.1296 7.12492 9.49968 7.12492ZM9.49968 5.54159C10.5495 5.54159 11.5563 5.95862 12.2986 6.70095C13.041 7.44329 13.458 8.4501 13.458 9.49992C13.458 10.5497 13.041 11.5566 12.2986 12.2989C11.5563 13.0412 10.5495 13.4583 9.49968 13.4583C8.44986 13.4583 7.44304 13.0412 6.70071 12.2989C5.95838 11.5566 5.54134 10.5497 5.54134 9.49992C5.54134 8.4501 5.95838 7.44329 6.70071 6.70095C7.44304 5.95862 8.44986 5.54159 9.49968 5.54159ZM14.6455 5.34367C14.6455 5.60612 14.5413 5.85783 14.3557 6.04341C14.1701 6.22899 13.9184 6.33325 13.6559 6.33325C13.3935 6.33325 13.1418 6.22899 12.9562 6.04341C12.7706 5.85783 12.6663 5.60612 12.6663 5.34367C12.6663 5.08122 12.7706 4.82951 12.9562 4.64393C13.1418 4.45834 13.3935 4.35409 13.6559 4.35409C13.9184 4.35409 14.1701 4.45834 14.3557 4.64393C14.5413 4.82951 14.6455 5.08122 14.6455 5.34367ZM9.49968 3.16659C7.54109 3.16659 7.22126 3.17213 6.31005 3.2125C5.68938 3.24179 5.27297 3.32492 4.88663 3.47534C4.54305 3.60834 4.29526 3.76746 4.03163 4.03188C3.78385 4.27128 3.59333 4.56355 3.4743 4.88688C3.32388 5.27479 3.24076 5.69042 3.21226 6.31029C3.17109 7.18429 3.16634 7.48988 3.16634 9.49992C3.16634 11.4585 3.17188 11.7783 3.21226 12.6895C3.24155 13.3094 3.32467 13.7266 3.4743 14.1122C3.60888 14.4565 3.76722 14.7043 4.03005 14.9672C4.29684 15.2332 4.54463 15.3923 4.88505 15.5237C5.27613 15.6749 5.69255 15.7588 6.31005 15.7873C7.18405 15.8285 7.48963 15.8333 9.49968 15.8333C11.4583 15.8333 11.7781 15.8277 12.6893 15.7873C13.3084 15.758 13.7256 15.6749 14.1119 15.5253C14.4547 15.3915 14.7041 15.2324 14.9669 14.9695C15.2337 14.7028 15.3928 14.455 15.5243 14.1145C15.6747 13.7243 15.7586 13.307 15.7871 12.6895C15.8283 11.8155 15.833 11.51 15.833 9.49992C15.833 7.54134 15.8275 7.2215 15.7871 6.31029C15.7578 5.69121 15.6747 5.27321 15.5243 4.88688C15.4049 4.56388 15.2148 4.27172 14.9677 4.03188C14.7284 3.78396 14.4361 3.59343 14.1127 3.47454C13.7248 3.32413 13.3084 3.241 12.6893 3.2125C11.8153 3.17134 11.5097 3.16659 9.49968 3.16659ZM9.49968 1.58325C11.6506 1.58325 11.919 1.59117 12.7629 1.63075C13.6061 1.67034 14.18 1.80254 14.6851 1.99888C15.2076 2.19996 15.6478 2.47229 16.0879 2.91167C16.4905 3.30742 16.802 3.78613 17.0007 4.3145C17.1963 4.81879 17.3293 5.39354 17.3688 6.23667C17.4061 7.08059 17.4163 7.34896 17.4163 9.49992C17.4163 11.6509 17.4084 11.9193 17.3688 12.7632C17.3293 13.6063 17.1963 14.1803 17.0007 14.6853C16.8025 15.214 16.491 15.6928 16.0879 16.0882C15.6921 16.4906 15.2134 16.8021 14.6851 17.001C14.1808 17.1965 13.6061 17.3295 12.7629 17.3691C11.919 17.4063 11.6506 17.4166 9.49968 17.4166C7.34872 17.4166 7.08034 17.4087 6.23642 17.3691C5.3933 17.3295 4.81934 17.1965 4.31426 17.001C3.78568 16.8026 3.30688 16.4911 2.91142 16.0882C2.50879 15.6925 2.19729 15.2137 1.99863 14.6853C1.8023 14.181 1.67009 13.6063 1.63051 12.7632C1.5933 11.9193 1.58301 11.6509 1.58301 9.49992C1.58301 7.34896 1.59092 7.08059 1.63051 6.23667C1.67009 5.39275 1.8023 4.81959 1.99863 4.3145C2.19674 3.78581 2.50831 3.30696 2.91142 2.91167C3.307 2.50889 3.78576 2.19737 4.31426 1.99888C4.81934 1.80254 5.39251 1.67034 6.23642 1.63075C7.08034 1.59354 7.34872 1.58325 9.49968 1.58325Z"
                fill="#474747"
              />
            </g>
          </svg>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_312_760)">
              <path
                d="M9.49968 15.8333C11.1794 15.8333 12.7903 15.166 13.978 13.9783C15.1657 12.7905 15.833 11.1796 15.833 9.49992C15.833 7.82021 15.1657 6.20931 13.978 5.02158C12.7903 3.83385 11.1794 3.16659 9.49968 3.16659C7.81997 3.16659 6.20906 3.83385 5.02133 5.02158C3.8336 6.20931 3.16634 7.82021 3.16634 9.49992C3.16634 11.1796 3.8336 12.7905 5.02133 13.9783C6.20906 15.166 7.81997 15.8333 9.49968 15.8333ZM9.49968 17.4166C5.1273 17.4166 1.58301 13.8723 1.58301 9.49992C1.58301 5.12754 5.1273 1.58325 9.49968 1.58325C13.8721 1.58325 17.4163 5.12754 17.4163 9.49992C17.4163 13.8723 13.8721 17.4166 9.49968 17.4166ZM7.03759 10.4262L5.06001 9.80946C4.63251 9.67884 4.63013 9.38434 5.1558 9.17296L12.8611 6.19629C13.3084 6.01421 13.5617 6.24459 13.4168 6.82171L12.1051 13.0125C12.0132 13.4535 11.748 13.5588 11.3799 13.3553L9.36034 11.8607L8.41905 12.7695C8.32247 12.8629 8.24409 12.9429 8.09526 12.9627C7.94722 12.9833 7.8253 12.9389 7.73584 12.6935L7.04709 10.4206L7.03759 10.4262Z"
                fill="#474747"
              />
            </g>
          </svg>
        </div>
        <span>+38(073) 096 36 44</span>
        <span>info@yanki.com</span>
      </div>
    </div>
    <div class="copyright">Copyright by@AuzaTeam. All rights reserved</div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 100px;
  padding-top: 50px;
  background-color: #e0bea2;
}
.columns {
  display: grid;
  grid-template-columns: 28% 28% 28% 16%;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.column h5 {
  font-size: 20px;
  margin-bottom: 12px;
}

.column .social-media {
  display: flex;
}

a,
span {
  color: #252525;
  font-weight: 200;
}

.copyright {
  font-size: 13px;
  padding: 40px 0 10px;
  text-align: center;
}
</style>
