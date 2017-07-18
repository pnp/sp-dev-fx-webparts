using System;
using System.ComponentModel;
using System.Reflection;
using System.Security;

namespace AskSPRider.Helper
{
    public class Common
    {
        public static SecureString getSecureString(string inputString)
        {
            var strSecure = new SecureString();

            if (!string.IsNullOrEmpty(inputString))
                foreach (char c in inputString.ToCharArray()) strSecure.AppendChar(c);

            return strSecure;
        }

        public static string GetDescription(Enum en)
        {
            Type type = en.GetType();

            MemberInfo[] memInfo = type.GetMember(en.ToString());

            if (memInfo != null && memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attrs != null && attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return en.ToString();
        }
    }

    
}