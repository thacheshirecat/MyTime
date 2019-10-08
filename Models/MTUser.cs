using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace MyTime.Models
{
  public class MTUser
  {
    private string _username;
    private string _password;
    private string _email;
    private int _userid;

    public string getUserName()
    {
      return _username;
    }
    public string getPassword()
    {
      return _password;
    }
    public string getEmail()
    {
      return _email;
    }
    public int getUserId()
    {
      return _userid;
    }

    public MTUser(string UserName, string Password, string Email, int UserId)
    {
      _username = UserName;
      _password = Password;
      _email = Email;
      _userid = UserId;
    }

    public static void Save(string inputUserName, string inputPassword, string inputEmail)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"INSERT INTO users(user_name, password, email) VALUES (@inputUser, @inputPass, @inputE);";
      cmd.Parameters.Add(new MySqlParameter("@inputUser", inputUserName));
      cmd.Parameters.Add(new MySqlParameter("@inputPass", inputPassword));
      cmd.Parameters.Add(new MySqlParameter("@inputE", inputEmail));
      cmd.ExecuteNonQuery();

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
    }
    public static MTUser getUserByName(string userName)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"SELECT * FROM users WHERE user_name = (@input);";
      cmd.Parameters.Add(new MySqlParameter("@input", userName));


      int userId = 0;
      string foundUserName = null;
      string password = null;
      string email = null;
      var rdr = cmd.ExecuteReader() as MySqlDataReader;
      while(rdr.Read())
      {
        userId = rdr.GetInt32(0);
        foundUserName = rdr.GetString(1);
        password = rdr.GetString(2);
        email = rdr.GetString(3);
      }
      MTUser foundUser = new MTUser(foundUserName, password, email, userId);

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
      return foundUser;
    }

    public static int verifyUserLogin(string inputUserName, string inputPassword)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"SELECT * FROM users WHERE user_name = (@input);";
      cmd.Parameters.Add(new MySqlParameter("@input", inputUserName));

      int userId = 0;
      string userName = null;
      string password = null;
      string email = null;
      var rdr = cmd.ExecuteReader() as MySqlDataReader;
      while(rdr.Read())
      {
        userId = rdr.GetInt32(0);
        userName = rdr.GetString(1);
        password = rdr.GetString(2);
        email = rdr.GetString(3);
      }

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
      Console.WriteLine(userName);
      Console.WriteLine(password);
      if(userName != inputUserName)
      {
        return 1;
      }
      else if(password != inputPassword)
      {
        return 2;
      }
      else
      {
        return 3;
      }
    }
  }
}
